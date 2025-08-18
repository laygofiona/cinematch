import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Match {
  id: string;
  name: string;
  avatar: string;
  compatibilityScore: number;
}

const Matches = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fake data for testing purposes
  const mockMatches: Match[] = [
    {
      id: "2", 
      name: "Sophia",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
      compatibilityScore: 92,
    },
    {
      id: "3",
      name: "Isabella",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face",
      compatibilityScore: 89,
    },
    {
      id: "4",
      name: "Olivia",
      avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=150&h=150&fit=crop&crop=face",
      compatibilityScore: 87,
    },
    {
      id: "5",
      name: "Ava",
      avatar: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=150&h=150&fit=crop&crop=face",
      compatibilityScore: 85,
    },
    {
      id: "6",
      name: "Mia",
      avatar: "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=150&h=150&fit=crop&crop=face", 
      compatibilityScore: 83,
    }
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setMatches(mockMatches);
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleMatchClick = (matchId: string) => {
    navigate(`/chat/${matchId}`);
  };

  const HeartLoadingComponent = () => (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="relative">
        <div className="w-16 h-16 text-[#eceaee] animate-pulse">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
            <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5 2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"/>
          </svg>
        </div>
      </div>
      <div className="mt-6 text-center">
        <h3 className="text-2xl font-semibold text-[#eceaee] mb-2">
          Finding Your Perfect Matches...
        </h3>
        <p className="text-[#eceaee]/70 text-lg">
          CineMatch is working her magic ✨
        </p>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-black">
        <div className="container mx-auto px-4 py-8">
          <HeartLoadingComponent />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#eceaee] mb-2">
            Your Matches
          </h1>
          <p className="text-[#eceaee]/70">
            {matches.length} perfect matches waiting for you 
          </p>
        </div>

        {/* Matches List */}
        {matches.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-3xl mt-12 font-semibold text-[#eceaee] mb-2">
              No matches yet, but love is coming!
            </h3>
            <p className="text-[#eceaee]/70 text-lg">
              Keep swiping to find your special someone! ❤️
            </p>
          </div>
        ) : (
          <div className="space-y-4 max-w-2xl mx-auto">
            {matches.map((match) => (
              <div
                key={match.id}
                className="bg-[#3d3250] border border-[#eceaee] rounded-md p-4 hover:shadow-md hover:shadow-[#eceaee]/20 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {/* Avatar */}
                    <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#eceaee]">
                      <img
                        src={match.avatar}
                        alt={match.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Name and Percentage */}
                    <div>
                      <h3 className="text-xl font-bold text-[#eceaee]">
                        {match.name}
                      </h3>
                      <p className="text-[#eceaee]/70">
                        {match.compatibilityScore}% match
                      </p>
                    </div>
                  </div>

                  {/* Start Chatting Button */}
                  <button
                    onClick={() => handleMatchClick(match.id)}
                    className="bg-white border border-[#eceaee] cursor-pointer px-6 py-2 rounded-md hover:bg-[#eceaee] text-[#021944] transition-all duration-200 font-medium"
                  >
                    Start Chatting
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom message */}
        {matches.length > 0 && (
          <div className="text-center mt-12 py-8 mb-6 border-t border-[#eceaee]/20">
            <h3 className="text-lg font-semibold text-[#eceaee] mb-2">
              Ready to find your soulmate?
            </h3>
            <p className="text-[#eceaee]/70">
              Your perfect match could be just one message away! 💌
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Matches;