import { useEffect, useState } from "react";
import TinderCard from "react-tinder-card";
import { useLockBodyScroll } from "@uidotdev/usehooks";
import { supabase } from "../SupabaseClient";

const Swipe = () => {
  // Locks Scrolling in the body
  useLockBodyScroll();

  // The useState & UseEffect are use to implement the supabase data
  const [movies, setMovies] = useState([]);
  const [visibleCount, setVisibleCount] = useState(5); // Show first 5 cards
  const [swipedCount, setSwipedCount] = useState(0); // Track swipes

  useEffect(() => {
    const fetchMovies = async () => {
      const { data, error } = await supabase.from("movies").select();
      if (error) {
        console.error("Error fetching movies:", error);
      } else {
        setMovies(data);
      }
    };

    fetchMovies();
  }, []);

  const handleSwipe = () => {
    setSwipedCount((prev) => {
      const newCount = prev + 1;
      // Reveal 5 more cards after every 5 swipes
      if (newCount % 5 === 0) {
        setVisibleCount((prevVisible) =>
          Math.min(prevVisible + 5, movies.length)
        );
      }
      console.log(newCount);
      return newCount;
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      {movies.slice(0, visibleCount).map((movie) => (
        <TinderCard
          key={movie?.movieId}
          className="absolute"
          flickOnSwipe
          swipeRequirementType="velocity"
          swipeThreshold={1.1}
          onSwipe={handleSwipe}
        >
          <div
            className="relative p-4 max-w-[85vw] w-[25.7em] h-[70vh] rounded-md 
                       m-auto bg-cover bg-center shadow-md shadow-gray-500/30"
            style={{ backgroundImage: `url(${movie?.Poster})` }}
          >
            <h3
              className="absolute bottom-1 left-1 m-4 p-3 rounded-md 
                           bg-[#021944] border border-[#eceaee] 
                           text-[#eceaee] text-center"
            >
              {movie?.title} | {movie?.genres} | {movie?.year}
            </h3>
          </div>
        </TinderCard>
      ))}
    </div>
  );
};

export default Swipe;
