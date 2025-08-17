import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
from supabase import create_client, Client
import os
from dotenv import load_dotenv


# Load environment variables
load_dotenv()

url: str = os.getenv("SUPABASE_URL")
key: str = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(url, key)

# Build user-movie matrix from Supabase where each row is a user and each column is a movie 
def get_user_movie_matrix():
    try:
        # Fetch swipes data from Supabase
        swipes = supabase.table("swipes").select("user_id, movie_id, liked").execute()
        
        # Check if swipes data is empty
        if not swipes.data:
            return pd.DataFrame()
        
        # Convert to DataFrame
        df = pd.DataFrame(swipes.data)

        # Convert liked (True/False) → (1/0)
        df['liked'] = df['liked'].astype(int)
        
        # Pivot to create user-movie matrix
        # Rows are user_id, columns are movie_id, values are liked (1 or 0)
        return df.pivot(index='user_id', columns='movie_id', values='liked')
    except Exception as e:
        print(f"Error fetching user-movie matrix: {e}")
        return pd.DataFrame()

# Build a user similarity matrix based on the user-movie matrix
def build_user_similarity_matrix(user_movie_matrix):
    user_ids = user_movie_matrix.index
    n_users = len(user_ids)
    
    # Initialize similarity matrix
    similarity_matrix = pd.DataFrame(
        np.zeros((n_users, n_users)), 
        index=user_ids, 
        columns=user_ids
    )
    
    # Compute pairwise similarities
    for i, u in enumerate(user_ids):
        for j, v in enumerate(user_ids):
            if i < j:  # only compute upper triangle
                sim = cosine_similarity(
                    user_movie_matrix.loc[u].values,
                    user_movie_matrix.loc[v].values
                )
                similarity_matrix.loc[u, v] = sim
                similarity_matrix.loc[v, u] = sim  
                
    return similarity_matrix

def recommend_movies(user_id, user_movie_matrix, similarity_matrix, movies_data, top_n=5):
    # 1. Get similar users (sorted by similarity score)
    similar_users = similarity_matrix.loc[user_id].sort_values(ascending=False)
    similar_users = similar_users.drop(user_id)  # remove self
    
    # 2. Movies current user has already rated
    user_ratings = user_movie_matrix.loc[user_id]
    seen_movies = set(user_ratings[~np.isnan(user_ratings)].index)
    
    # 3. Collect candidate movies from similar users
    recommendations = {}
    for sim_user, score in similar_users.items():
        if score <= 0:
            continue  # skip non-similar users
        sim_user_ratings = user_movie_matrix.loc[sim_user]
        liked_movies = sim_user_ratings[sim_user_ratings == 1].index
        
        for movie in liked_movies:
            if movie not in seen_movies:
                # accumulate weighted score
                recommendations[movie] = recommendations.get(movie, 0) + score
    
    # 4. Rank candidate movies by accumulated score
    sorted_recs = sorted(recommendations.items(), key=lambda x: x[1], reverse=True)
    top_movies = [m for m, _ in sorted_recs[:top_n]]
    
    # 5. Return movie titles instead of IDs
    return movies_data[movies_data['movieId'].isin(top_movies)]


# Function to calculate cosine similarity between two user vectors
# Each vector is a row from user-movie matrix where 1 = liked, 0 = not liked, NaN = not rated
def cosine_similarity(u, v):
    # Mask is True only for indices where both u and v have valid values (no NaN)
    # Ensures we only compare movies that both users have actually seen/swiped
    # Basically ignore all NaN values or unwatched movies
    mask = ~np.isnan(u) & ~np.isnan(v)
    
    # count how many movies both users have rated
    num_rated = np.sum(mask)
    if num_rated == 0:
        return 0.0  # No common movies rated, return similarity of 0
    
    # Calculate cosine similarity only for the masked values
    # Higher values mean more similarity
    return np.dot(u[mask], v[mask]) / (np.linalg.norm(u[mask]) * np.linalg.norm(v[mask]))

