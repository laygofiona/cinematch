import { useEffect, useState } from "react";
import TinderCard from "react-tinder-card";
import { useLockBodyScroll } from "@uidotdev/usehooks";
import { supabase } from "../SupabaseClient";
import { useNavigate } from "react-router-dom";

interface Movie {
  movieId: number;
  Poster: string;
  title: string;
  genres: string;
  year: number;
}

const Swipe = () => {
  useLockBodyScroll();

  const [movies, setMovies] = useState<Movie[]>([]);
  const [swipedCount, setSwipedCount] = useState(0);
  const [visibleCount, setVisibleCount] = useState(20);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [swipedMovieIds, setSwipedMovieIds] = useState<Set<number>>(new Set());

  const getValidMovies = async (moviesData: Movie[]) => {
    const validMovies = [];
    for (const movie of moviesData) {
      try {
        const imgResponse = await fetch(movie.Poster, { method: 'HEAD' });
        if (imgResponse.ok) {
          validMovies.push(movie);
        } else {
          let movie_data = {...movie, Poster: 'https://www.reelviews.net/resources/img/default_poster.jpg'};
          validMovies.push(movie_data);
        }
      } catch (imgError) {
        console.error(`Error fetching image for movie ${movie.title}:`, imgError);
        // Still add the movie with default poster
        let movie_data = {...movie, Poster: 'https://www.reelviews.net/resources/img/default_poster.jpg'};
        validMovies.push(movie_data);
      }
    }
    return validMovies;
  }

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError || !sessionData?.session) {
        console.error("No active session found, redirecting to sign-in.");
        navigate("/signin");
        setLoading(false);
        return;
      }

      const userId = sessionData.session.user.id;

      const { data: swipesData, error: swipesError } = await supabase
        .from("swipes")
        .select("id", { count: "exact" })
        .eq("user_id", userId)
        .limit(1);

      if (swipesError) {
        console.error("Error fetching swipe count:", swipesError);
        setLoading(false);
        return;
      }

      const swipeCount = swipesData ? swipesData.length : 0;
      
      try {
        let response;
        // If user has swiped 10 or more movies, fetch personalized recommendations
        // Otherwise, fetch initial movie data
        if (swipeCount >= 10) {
          console.log("Fetching personalized movie recommendations...");
          response = await fetch(`http://localhost:5000/api/recommendations/${userId}`);
        } else {
          console.log("Fetching initial movie data...");
          response = await fetch(`http://localhost:5000/api/initial_swipe/${userId}`);
        }

        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const moviesData = await response.json();
        const validMovies = await getValidMovies(moviesData);
        setMovies(validMovies);

      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchMovies();
  }, [navigate]);

  useEffect(() => {
    if (swipedCount >= visibleCount && swipedCount > 0) {
      setVisibleCount((prev) => prev + 20);
      fetchMoreMovies();
    }
  }, [swipedCount, visibleCount, navigate]);

  const fetchMoreMovies = async () => {
    try {
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError || !sessionData?.session) {
        console.error("No active session found, redirecting to sign-in.");
        navigate("/signin");
        return;
      }

      const userId = sessionData.session.user.id;
      let response = await fetch(`http://localhost:5000/api/recommendations/${userId}`);
        
      if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
      }

      const moviesData = await response.json();
      const validMovies = await getValidMovies(moviesData);
      
      // Add new movies instead of replacing all
      setMovies(prevMovies => [...prevMovies, ...validMovies]);

    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  }

  const recordSwipe = async (direction: string, movie: Movie) => {
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    if (sessionError || !sessionData?.session) {
      console.error("No active session found, redirecting to sign-in.");
      navigate("/signin");
      return;
    }

    const userId = sessionData.session.user.id;
    const liked = direction === "right";

    try {
      const request = await fetch("http://localhost:5000/api/swipe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          movieId: movie.movieId,
          liked,
        }),
      });

      console.log("Movie id:", movie.movieId, "Liked:", liked);
      console.log("Swipe recorded:", await request.json());
    } catch (error) {
      console.error("Error recording swipe:", error);
    }
  };

  const handleCardLeftScreen = (direction: string, movie: Movie) => {
    console.log(`Card swiped ${direction} for movie: ${movie.title}`);
    
    recordSwipe(direction, movie);
    setSwipedMovieIds(prev => new Set(prev).add(movie.movieId));
    setSwipedCount(prev => prev + 1);
  };

  // Filter out swiped movies and reverse for proper stacking
  const visibleMovies = movies
    .filter(movie => !swipedMovieIds.has(movie.movieId))
    .slice(0, 10) // Limit visible cards for performance
    .reverse(); // Reverse so the first card is on top

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <p>Loading movies...</p>
      </div>
    );
  }

  if (visibleMovies.length === 0) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <p>No more movies to swipe!</p>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      {/* Swipe Instructions */}
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="flex items-center space-x-8 bg-black/20 backdrop-blur-sm rounded-full px-6 py-3">
          <div className="flex items-center space-x-2 text-red-500">
            <div className="w-8 h-8 rounded-full border-2 border-red-500 flex items-center justify-center">
              <span className="text-lg font-bold">&times;</span>
            </div>
            <span className="text-white font-medium">Swipe Left</span>
          </div>
          <div className="w-px h-6 bg-white/30"></div>
          <div className="flex items-center space-x-2 text-green-500">
            <span className="text-white font-medium">Swipe Right</span>
            <div className="w-8 h-8 rounded-full border-2 border-green-500 flex items-center justify-center">
              <span className="text-lg font-bold">&hearts;</span>
            </div>
          </div>
        </div>
      </div>

      {/* Left side indicator */}
      <div className="absolute left-8 top-1/2 transform -translate-y-1/2 z-10">
        <div className="flex flex-col items-center space-y-3 text-red-500">
          <div className="w-12 h-12 rounded-full border-3 border-red-500 flex items-center justify-center bg-red-500/10">
            <span className="text-2xl font-bold">&times;</span>
          </div>
          <div className="text-white font-bold text-sm bg-red-500/80 px-3 py-1 rounded-full">
            PASS
          </div>
        </div>
      </div>

      {/* Right side indicator */}
      <div className="absolute right-8 top-1/2 transform -translate-y-1/2 z-10">
        <div className="flex flex-col items-center space-y-3 text-green-500">
          <div className="w-12 h-12 rounded-full border-3 border-green-500 flex items-center justify-center bg-green-500/10">
            <span className="text-2xl font-bold">&hearts;</span>
          </div>
          <div className="text-white font-bold text-sm bg-green-500/80 px-3 py-1 rounded-full">
            LIKE
          </div>
        </div>
      </div>

      {visibleMovies.map((movie, index) => (
        <TinderCard
          key={`${movie.movieId}-${index}`}
          className="absolute"
          onCardLeftScreen={(direction) => handleCardLeftScreen(direction, movie)}
          preventSwipe={['up', 'down']}
          flickOnSwipe={true}
          swipeRequirementType="position"
          swipeThreshold={100}
          onSwipe={(direction) => console.log(`Swiping ${direction}`)}
        >
          <div
            className="relative p-4 max-w-[85vw] w-[25.7em] h-[70vh] rounded-md 
                       m-auto bg-cover bg-center shadow-md shadow-gray-500/30"
            style={{ backgroundImage: `url(${movie.Poster})` }}
          >
            <h3
              className="absolute bottom-1 left-1 m-4 p-3 rounded-md 
                         bg-[#021944] border border-[#eceaee] 
                         text-[#eceaee] text-center"
            >
              {movie.title} | {movie.genres} | {movie.year}
            </h3>
          </div>
        </TinderCard>
      ))}
    </div>
  );
};

export default Swipe;