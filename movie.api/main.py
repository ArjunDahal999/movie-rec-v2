import pandas as pd
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import re
import uvicorn
from recommend_from_query import recommend_movies_from_query
from recommend_from_movie import predict_movies


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


@app.get('/')
def home():
    return {"status": "working"}

@app.get('/movie-from-query/{query}')
def getRecommendationFromQuery(query: str): 
    return recommend_movies_from_query(query)
    

@app.get('/predict/{moviename}')
def predict_movies_endpoint(moviename: str):
    print(predict_movies(moviename))
    return predict_movies(moviename)


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
    uvicorn.run(app, host="0.0.0.0", port=8000, )