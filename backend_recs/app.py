from supabase import create_client, Client
import os
from flask import Flask, request, jsonify
import pandas as pd
import numpy as np
from utils import get_user_movie_matrix, build_user_similarity_matrix, recommend_movies
from dotenv import load_dotenv
from flask_cors import CORS

load_dotenv()
# Initialize Flask app
app = Flask(__name__)

# Adding CORS support to allow requests from react frontend
CORS(app, origins=["http://localhost:5173"])


# Initialize Supabase client
url: str = os.getenv("SUPABASE_URL")
key: str = os.getenv("SUPABASE_KEY")
supabase: Client = create_client(url, key)



@app.route('/api/swipe', methods=['POST'])
def swipe():
    try:
        # Get user swipe data from request
        data = request.get_json()
        user_id = data.get("userId")
        movie_id = data.get("movieId")
        liked = data.get("liked")

        # Validate input
        if not user_id:
            return jsonify({"error": "Invalid user_id"}), 400
        if not movie_id:
            return jsonify({"error": "Invalid movie_id"}), 400
        if liked is None:
            return jsonify({"error": "Invalid liked value"}), 400
        
        # Insert swipe data into Supabase

        res = supabase.table("swipes").insert({
            "user_id": user_id,
            "movie_id": movie_id,
            "liked": liked
        }).execute()

        return jsonify({"message": "Swipe recorded", "data": res.data}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/recommendations/<user_id>', methods=['GET'])
def get_recommendations(user_id):
    try:
        user_movie_matrix = get_user_movie_matrix()
        similarity_matrix = build_user_similarity_matrix(user_movie_matrix)

        movies = supabase.table("movies").select("*").execute()
        
        # only get movies that have not been swiped by the user
        # get movie ids that the user has swiped
        swiped_movies = supabase.table("swipes").select("movie_id").eq("user_id", user_id).execute()
        swiped_movie_ids = [swipe['movie_id'] for swipe in swiped_movies.data]
        
        if swiped_movie_ids:
            movies = movies.data
            # filter out swiped movies
            movies = [movie for movie in movies if movie['movieId'] not in swiped_movie_ids]
        
        # Check if movies data is empty
        if not movies.data:
            return jsonify({"error": "No movies found"}), 404
        
        # Convert to DataFrame
        movies_data = pd.DataFrame(movies.data)
        
        # Recommend 10 movies for the user
        recs = recommend_movies(user_id, user_movie_matrix, similarity_matrix, movies_data, top_n=10)

        return recs.to_json(orient="records")
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/matches/<user_id>', methods=['GET'])
def get_matches(user_id):
    try:
        # Get user-movie matrix and similarity matrix
        user_movie_matrix = get_user_movie_matrix()
        similarity_matrix = build_user_similarity_matrix(user_movie_matrix)

        # Get similar users
        similar_users = similarity_matrix.loc[user_id].sort_values(ascending=False).drop(user_id)
    
        # If no similar users found, return empty list 
        if similar_users.empty:
            return jsonify({"matches": []}), 200
    
        # Get top 5 similar users
        top_matches = similar_users.head(5).index.tolist()
        
        # Based on the id in top_matches, get the username and id from the users table
        
        matched_users = []
        
        for user_id in top_matches:
            user = supabase.table("users").select("id, username").eq("id", user_id).execute()
            if user.data:
                matched_users.append(user.data[0])
       
        

        return jsonify({"matches": matched_users}), 200
    except Exception as e:
        return jsonify({"error": f"Error getting matches for user {str(e)}"}), 500

# Route to give first-time user 30 movies to swipe on to build their profile data
@app.route('/api/initial_swipe/<user_id>', methods=['GET'])
def initial_swipe(user_id: str):
    try:
        
        # Get the id of the movies that the user has swiped
        swiped_movies = supabase.table("swipes").select("movie_id").eq("user_id", user_id).execute()
    
        swiped_movie_ids = [swipe['movie_id'] for swipe in swiped_movies.data]
        
        movies = None
        
        # Get 10 movies from the movies table that the user has not swiped
        if swiped_movie_ids:
            movies = supabase.table("movies").select("*").not_.in_("movieId", swiped_movie_ids).limit(10).execute()
        else:
            # If no swiped movies, get the first 10 movies
            movies = supabase.table("movies").select("*").limit(10).execute()
        
        # Check if movies data is empty
        if not movies.data:
            return jsonify({"error": "No movies found"}), 404
        
        # Convert to DataFrame
        movies_data = pd.DataFrame(movies.data)

        # Return the movies for the user to swipe on
        return movies_data.to_json(orient="records")
    except Exception as e:
        return jsonify({"error": str(e)}), 500