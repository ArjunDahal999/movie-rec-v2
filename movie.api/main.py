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
combined_features = movie_data[selected_features].agg(' '.join, axis=1) #1,7000000,Action Adventure Fantasy Science Fiction => ['Action','Adventure','Fantasy']

# Custom TF-IDF implementation
def compute_tfidf(documents):
    word_doc_freq = Counter() # Keeps track of all the words frequency through out whole document , more like global counter
    doc_word_count = []  # Keeps track of word frequency for each document in an array
    for doc in documents:

        # Example: doc1 = "action  sci-fi action "
        # Example: doc2 = "action adventure "
        words = doc.split()
        # words = ["action", "sci-fi" , "action"]
        # words = ["action", "adventure"]

        # word_doc_freq keeps track of how many documents contain each word
        word_doc_freq.update(set(words))  # initally 1st>> {"action":2,"sifi:1"} 2nd>>{"action": 3, "sci-fi": 1, "adventure": 1}

        # doc_word_count stores word frequency for each document
        doc_word_count.append(Counter(words))  # Creates 1st>>[{"action": 2, "sci-fi": 1}] 2nd>>[{"action": 2, "sci-fi": 1},{"action": 1, "adventure": 1}]
    
    # total no of documents presnt, in our case it is 4803
    N = len(documents)
    tfidf_vectors = []  # it store the vector for each document 
    for doc_counts in doc_word_count:
        tfidf = {} # it store the tfidf value for each word in the document ,like {"action": 0.67, "sci-fi": 0.44}
        for word, count in doc_counts.items(): # 1st>>{"action": 2, "sci-fi": 1}
            # here for 1st word = action, count = 2
            tf = count / sum(doc_counts.values())   # here tf = 2/3 = 0.67 (here values() will return [2,1] and sum of it is 3)
            idf = log(N / (word_doc_freq[word] + 1)) # here word_doc_freq[word] will return the total no repeatation of word throughout the documents
            tfidf[word] = tf * idf 

  
        tfidf_vectors.append(tfidf) # 1st>>[{"action": 0.67, "sci-fi": 0.44}] 2nd>>[{"action": 0.67, "sci-fi": 0.44},{"action": 0.33, "adventure": 0.44}]
    return tfidf_vectors

# Compute cosine similarity 
def cosine_similarity(vec1, vec2): #( {"action": 0.67, "sci-fi": 0.44,"gg":4} ,{"action": 0.33, "adventure": 0.44,"gg":2} )   
    
    intersection = set(vec1.keys()) & set(vec2.keys()) # = {'action','gg'} , since action is present in both vector
    numerator = sum([vec1[x] * vec2[x] for x in intersection]) # for every intersection  (0.67*0.33)+(4*2)(for other similar keys present in both vector)
    sum1 = sum([vec1[x]**2 for x in vec1.keys()]) # 0.67^2 + 0.44^2 + 4^2
    sum2 = sum([vec2[x]**2 for x in vec2.keys()]) # 0.33^2 + 0.44^2 + 2^2
    denominator = sqrt(sum1) * sqrt(sum2) 
    
    return numerator / denominator if denominator else -1 # returns value between -1 and 1


def cal_euclidean_distance(vec1, vec2):
        intersection = set(vec1.keys()) & set(vec2.keys())
        sum_squared_diff = sum((vec1[x] - vec2[x]) ** 2 for x in intersection)
        return sqrt(sum_squared_diff)

# Compute TF-IDF vectors
tfidf_vectors = compute_tfidf(combined_features) # [{"action": 0.67, "sci-fi": 0.44},{"action": 0.33, "adventure": 0.44}]


def predict_movies(movie: str, top_n: int = 15):
    list_of_all_titles = movie_data['title'].tolist() # ['Avatar','Aveneger']
    find_close_match = difflib.get_close_matches(movie, list_of_all_titles) #returns list similar title 
    if not find_close_match:
        return []
    close_match = find_close_match[0]
    index_of_the_movie = movie_data[movie_data.title == close_match].index[0]
    
    # Compute similarity scores
    similarity_scores = []
    euclid_distance = []

    for i in range(len(tfidf_vectors)):
        score = cosine_similarity(tfidf_vectors[index_of_the_movie], tfidf_vectors[i]) # ( {"action": 0.67, "sci-fi": 0.44} ,{"action": 0.33, "adventure": 0.44} )
        euclid_distance.append( (i,cal_euclidean_distance(tfidf_vectors[index_of_the_movie], tfidf_vectors[i])))
        similarity_scores.append((i, score))

    # Sort by similarity score
    sorted_similar_movies = sorted(similarity_scores, key=lambda x: x[1], reverse=True)
    # sorted_similar_movies = sorted(euclid_distance, key=lambda x: x[1], reverse=False)
    
    # Return top N similar movies
    return [movie_data.iloc[movie[0]]['title'] for movie in sorted_similar_movies[0:top_n+1]]

@app.get('/')
def home():
    return {"status": "ok "}

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