import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


movies = pd.read_csv("movies.csv" )

# Fill missing values in the dataset
movies = movies.fillna({
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

# Preprocessing: Combine relevant columns
movies["combined_features"] = (
    movies["genres"].str.lower() + " " +
    movies["keywords"].str.lower() + " " +
    movies["overview"].str.lower() + " " +
    movies["cast"].str.lower() + " " +
    movies["director"].str.lower() + " " +
    movies["title"].str.lower()
)


# Vectorize the combined features
tfidf = TfidfVectorizer(stop_words="english")
tfidf_matrix = tfidf.fit_transform(movies["combined_features"])

def recommend_movies_from_query(description:str):
    if not description.strip():
        return {"error": "Description cannot be empty."}
    lowercase_description = description.lower()
    user_query_vector = tfidf.transform([lowercase_description])
    similarity_scores = cosine_similarity(user_query_vector, tfidf_matrix)
    similar_movies_indices = similarity_scores[0].argsort()[::-1][:15]
    similar_movies_scores = similarity_scores[0][similar_movies_indices]
    recommended_movies = movies.iloc[similar_movies_indices][['revenue', 'title', 'director', 'genres', 'cast', 'overview',]]
    recommended_movies = recommended_movies.copy()
    recommended_movies["similarity_score"] = similar_movies_scores
    response = recommended_movies.to_dict(orient="records")
    return {"data": response}

