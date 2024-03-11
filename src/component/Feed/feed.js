import React, { useEffect, useState } from "react";
import axios from "axios";
import VideoCard from "../VideoCard/videoCard";
import Skeleton from "react-loading-skeleton"; // Import React Loading Skeleton

function Feed() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [currentPage, setCurrentPage] = useState(0); // Start from page 0
  const itemsPerPage = 8; // Number of videos to display per page
  const totalPages = Math.ceil(videos.length / itemsPerPage); // Total number of pages

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    const apiUrl = `https://internship-service.onrender.com/videos`;

    try {
      const response = await axios.get(apiUrl);
      if (response.data.message === "Success") {
        setVideos(response.data.data.posts);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      // Set loading to false after fetching
      setLoading(false);
    }
  };

  const handlePageChange = (page) => {
    // Scroll to the top of the page
    window.scrollTo(0, 0);
    setCurrentPage(page);
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  return (
    <div className="flex-grow h-full overflow-y-auto bg-opacity-90 bg-gray-900">
      <div className="container mx-auto px-4 py-5">
        {/* Loading indicator */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4">
            {[...Array(8)].map((_, index) => (
              <div
                key={index}
                className="bg-gray-900 text-white shadow-2xl border-solid rounded p-2"
              >
                <Skeleton height={400} />
              </div>
            ))}
          </div>
        ) : (
          // Render videos when not loading
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4">
            {videos.slice(startIndex, endIndex).map((video) => (
              <div
                key={video.postId}
                className="mb-8 bg-gray-900 text-white shadow-2xl border-solid rounded p-2 hover:shadow-md transition duration-300 ease-in-out"
              >
                <VideoCard video={video} currentPage={currentPage} />
              </div>
            ))}
          </div>
        )}
        <div className="flex justify-center mt-2">
          {/* Pagination buttons */}
          <button
            className={`mx-1 my-1 px-2 py-1 rounded-full border border-white text-white hover:bg-white hover:text-black transition duration-300 ease-in-out ${
              currentPage === 0 ? "disabled" : ""
            }`}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 0}
          >
            Prev
          </button>
          <button
            className="mx-1 my-1 px-2 py-1 rounded-full border border-white text-white hover:bg-white hover:text-black transition duration-300 ease-in-out"
            onClick={() => {}}
            disabled
          >
            {currentPage + 1}
          </button>
          <button
            className={`mx-1 my-1 px-2 py-1 rounded-full border border-white text-white hover:bg-white hover:text-black transition duration-300 ease-in-out ${
              currentPage === totalPages - 1 ? "disabled" : ""
            }`}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages - 1}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Feed;
