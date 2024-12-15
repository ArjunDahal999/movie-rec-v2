import pandas as pd
from collections import Counter
from math import log, sqrt
import difflib


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
            idf = log(N / (word_doc_freq[word] + 1)) # here word_doc_freq[word] will return the total no repeatation of word throughout the all documents
            tfidf[word] = tf * idf 

  
        tfidf_vectors.append(tfidf) # 1st>>[{"action": 0.67, "sci-fi": 0.44}] 2nd>>[{"action": 0.67, "sci-fi": 0.44},{"action": 0.33, "adventure": 0.44}]
    return tfidf_vectors


def cosine_similarity(vec1, vec2): #( {"action": 0.67, "sci-fi": 0.44,"gg":0.4} ,{"action": 0.33, "adventure": 0.44,"gg":0.2} )   
    
    intersection = set(vec1.keys()) & set(vec2.keys()) # = {'action','gg'} , since actionand gg is present in both vector
    numerator = sum([vec1[x] * vec2[x] for x in intersection]) # for every intersection  (0.67*0.33)+(4*2)(for other similar keys present in both vector)
    sum1 = sum([vec1[x]**2 for x in vec1.keys()]) # 0.67^2 + 0.44^2 + 4^2
    sum2 = sum([vec2[x]**2 for x in vec2.keys()]) # 0.33^2 + 0.44^2 + 2^2
    denominator = sqrt(sum1) * sqrt(sum2) 
    
    return numerator / denominator if denominator else -1 # returns value between -1 and 1

def euclidean_distance(vec1, vec2):
    distance = 0
    for key in set(vec1) | set(vec2):
        diff = vec1.get(key, 0) - vec2.get(key, 0)
        distance += diff * diff
    return sqrt(distance)

selected_features = ['genres', 'keywords', 'tagline', 'cast', 'director']
combined_features = movie_data[selected_features].agg(' '.join, axis=1) #1,7000000,Action Adventure Fantasy Science Fiction => ['Action','Adventure','Fantasy']
tfidf_vectors = compute_tfidf(combined_features) # [{"action": 0.67, "sci-fi": 0.44},{"action": 0.33, "adventure": 0.44}]



def predict_movies(movie: str, top_n: int = 15):
    list_of_all_titles = movie_data['title'].tolist() # ['Avatar','Aveneger']
    find_close_match = difflib.get_close_matches(movie, list_of_all_titles) #returns list similar title 
    if not find_close_match:
        return []
    close_match = find_close_match[0]
    index_of_the_movie = movie_data[movie_data.title == close_match].index[0]
    
    # Compute similarity scores
    similarity_scores_cosine = []
    similarity_scores_euclid = []

    for i in range(len(tfidf_vectors)):
        score = cosine_similarity(tfidf_vectors[index_of_the_movie], tfidf_vectors[i]) # ( {"action": 0.67, "sci-fi": 0.44} ,{"action": 0.33, "adventure": 0.44} )
        distance = euclidean_distance(tfidf_vectors[index_of_the_movie], tfidf_vectors[i])
        similarity_scores_cosine.append((i, score))
        similarity_scores_euclid.append((i, distance))

    # Sort by similarity score
    # sorted_similar_movies = sorted(similarity_scores_cosine, key=lambda x: x[1], reverse=True)
    sorted_similar_movies = sorted(similarity_scores_euclid, key=lambda x: x[1], reverse=False)
    
    def get_movie_details(index, score):
        return {
            'title': movie_data.iloc[index]['title'],
            'genres': movie_data.iloc[index]['genres'],
            'keywords': movie_data.iloc[index]['keywords'],
            'tagline': movie_data.iloc[index]['tagline'],
            'cast': movie_data.iloc[index]['cast'],
            'director': movie_data.iloc[index]['director'],
            'overview': movie_data.iloc[index]['overview'],
            'revenue': float(movie_data.iloc[index]['revenue']),
            'similarity_score': float(score)
        }
    
    print(sorted_similar_movies[0:top_n+1])
    return [get_movie_details(movie[0], movie[1]) for movie in sorted_similar_movies[0:top_n+1]]
    

