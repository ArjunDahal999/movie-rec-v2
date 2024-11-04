import pandas as pd
import difflib
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import re
from math import log, sqrt
from collections import Counter
import uvicorn

app = FastAPI()
# CORS middleware setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load movie data once at startup
movie_data = pd.read_csv("movies.csv", encoding="utf-8")

# Preprocess movie data
movie_data = movie_data.fillna({
    'budget': 0,
    'genres': '',
    'homepage': '',
    'keywords': '',
    'original_language': '',
    'original_title': '',
    'overview': '',
    'popularity': 0.0,
    'production_companies': '',
    'production_countries': '',
    'release_date': '',
    'revenue': 0,
    'runtime': 0.0,
    'spoken_languages': '',
    'status': '',
    'tagline': '',
    'title': '',
    'vote_average': 0.0,
    'vote_count': 0,
    'cast': '',
    'crew': '',
    'director': ''
})

# Selecting the relevant features for the movie recommendation
selected_features = ['genres', 'keywords', 'tagline', 'cast', 'director']

# Combine features
combined_features = movie_data[selected_features].agg(' '.join, axis=1)

# Custom TF-IDF implementation
def compute_tfidf(documents):
    word_doc_freq = Counter()
    doc_word_count = []
    for doc in documents:
        words = doc.split()
        word_doc_freq.update(set(words))
        doc_word_count.append(Counter(words))

    N = len(documents)
    tfidf_vectors = []
    for doc_counts in doc_word_count:
        tfidf = {}
        for word, count in doc_counts.items():
            tf = count / sum(doc_counts.values())
            idf = log(N / (word_doc_freq[word] + 1))
            tfidf[word] = tf * idf
        tfidf_vectors.append(tfidf)
    return tfidf_vectors

# Compute cosine similarity
def cosine_similarity(vec1, vec2):
    intersection = set(vec1.keys()) & set(vec2.keys())
    numerator = sum([vec1[x] * vec2[x] for x in intersection])
    
    sum1 = sum([vec1[x]**2 for x in vec1.keys()])
    sum2 = sum([vec2[x]**2 for x in vec2.keys()])
    denominator = sqrt(sum1) * sqrt(sum2)
    
    return numerator / denominator if denominator else 0
# Compute TF-IDF vectors

tfidf_vectors = compute_tfidf(combined_features)

def predict_movies(movie: str, top_n: int = 15):
    list_of_all_titles = movie_data['title'].tolist()
    find_close_match = difflib.get_close_matches(movie, list_of_all_titles, n=1)
    if not find_close_match:
        return []
    close_match = find_close_match[0]
    index_of_the_movie = movie_data[movie_data.title == close_match].index[0]
    
    # Compute similarity scores
    similarity_scores = [
        (i, cosine_similarity(tfidf_vectors[index_of_the_movie], tfidf_vectors[i]))
        for i in range(len(tfidf_vectors))
    ]
    
    # Sort by similarity score
    sorted_similar_movies = sorted(similarity_scores, key=lambda x: x[1], reverse=True)
    
    # Return top N similar movies
    return [movie_data.iloc[movie[0]]['title'] for movie in sorted_similar_movies[1:top_n+1]]

@app.get('/')
def home():
    return {"status": "Working"}

@app.get('/predict/{moviename}')
def predict_movies_endpoint(moviename: str):
    movie_titles = predict_movies(moviename)
    recommended_movies = []
    for title in movie_titles:
        movie_info = movie_data[movie_data['title'] == title].iloc[0]
        recommended_movies.append({
            'title': movie_info['title'],
            'director': movie_info['director'],
            'revenue': int(movie_info['revenue']),
            'release_date': movie_info['release_date'],
            'popularity': float(movie_info['popularity']),
            'overview': movie_info['overview'],
        })
    return {"data": recommended_movies, "success": True}

@app.get('/random-movie')
def random_movie():
    random_movies = movie_data.sample(n=10)[['revenue', 'title', 'director', 'release_date', 'popularity', 'overview']]
    return {"data": random_movies.to_dict(orient="records"),"success": True}

@app.get('/top-popular-movies')
def top_popular_movies():
    top_movies = movie_data.nlargest(8, 'popularity')[['revenue', 'title', 'director', 'release_date', 'popularity', 'overview']]
    return {"data": top_movies.to_dict(orient="records"),"success": True} 

@app.get('/highest-grossing-movie')
def top_popular_movies():
    top_movies = movie_data.nlargest(10, 'revenue')[['revenue', 'title', 'director', 'release_date', 'popularity', 'overview']]
    return {"data": top_movies.to_dict(orient="records"), "success": True}

@app.get('/autocomplete/{name}')
def auto_suggestion(name: str):
    if not name:
        return {"name": []}
    pattern = re.compile(re.escape(name), re.IGNORECASE)
    matched_titles = movie_data[movie_data['title'].str.contains(pattern, na=False)]['title'].tolist()
    return {"data": matched_titles[:10] , "success": True}

@app.get('/{name}')
def get_movie(name: str):
    try:
        result = movie_data.set_index('title').loc[name].drop(["crew"])
        return {"data": result.to_dict(), "success": True}
    except KeyError:
        return {"error": "Movie not found", "success": False}
    
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)