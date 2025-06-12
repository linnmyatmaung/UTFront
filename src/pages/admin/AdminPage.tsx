import { getVoteCounts, VoteCountsResponseDto } from "@/api/adminApi";
import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar"; // Adjust path based on your project structure
import Loader from "@/common/Loader";
const VoteDisplay: React.FC = () => {
  const [voteData, setVoteData] = useState<VoteCountsResponseDto | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchVoteCounts = async () => {
      const data = await getVoteCounts();
      setVoteData(data);
    };

    fetchVoteCounts();
  }, []);

  if (!voteData) return <Loader />;

  return (
    <div className="flex min-h-screen">
      {/* Sidebar Component */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <div className="flex-1 ml-0 md:ml-64 p-6">
        {/* Open Button */}
        {!sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(true)}
            className="mb-4 text-3xl fixed top-4 left-4 z-20 text-gray-800 bg-gray-200 rounded p-1"
            aria-label="Open sidebar"
          >
            &#9776;
          </button>
        )}

        <div className="py-6 flex flex-col justify-center items-center sm:py-12">
          <h2 className="text-2xl font-bold m-4">Male Votes</h2>
          <ul>
            {voteData.maleVotes.map((vote) => (
              <li key={vote.selectionId} className="font-poppins mb-2 text-lg">
                {vote.selectionName}:{" "}
                <span className="text-violet-600">{vote.voteCount}</span>
              </li>
            ))}
          </ul>

          <h2 className="text-2xl font-bold m-4">Female Votes</h2>
          <ul>
            {voteData.femaleVotes.map((vote) => (
              <li key={vote.selectionId} className="font-poppins mb-2 text-lg">
                {vote.selectionName}:{" "}
                <span className="text-violet-600">{vote.voteCount}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default VoteDisplay;
