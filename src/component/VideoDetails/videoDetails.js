import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";

const VideoDetails = () => {
  const { id } = useParams(); // Video ID
  const [video, setVideo] = useState(null);
  const location = useLocation();
  const currentPage = new URLSearchParams(location.search).get("page");

  useEffect(() => {
    fetchVideoDetails(id, currentPage);
  }, [id, currentPage]);

  const fetchVideoDetails = async (videoId, currentPage) => {
    try {
      const response = await fetch(
        `https://internship-service.onrender.com/videos?page=${currentPage}`
      );
      if (response.ok) {
        const data = await response.json();
        // Find the post with the matching ID
        const videoPost = data.data.posts.find(
          (post) => post.postId === videoId
        );

        if (videoPost) {
          setVideo(videoPost);
        } else {
          console.error("Video not found");
        }
      } else {
        console.error("Failed to fetch video details");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Checking if video data is available
  if (!video) {
    return <p>Loading...</p>;
  }

  return (
    <div className="h-full bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="relative" style={{ paddingBottom: "56.25%" }}>
          <video
            controls
            className="absolute inset-0 w-full h-full rounded-lg"
            src={video.submission.mediaUrl}
            type="video/mp4"
          />
        </div>
        <div className="mt-8">
          <h1 className="text-2xl md:text-4xl font-semibold mb-4">
            {video.submission.title}
          </h1>
          <div className="flex items-center mb-4">
            <div className="h-10 w-10 rounded-full overflow-hidden">
              <img
                className="h-full w-full object-cover"
                src={video.creator.pic}
                alt="Author Avatar"
              />
            </div>
            <span className="text-sm ml-2">{video.creator.name}</span>
          </div>
          <p className="text-sm md:text-base leading-relaxed">
            {video.submission.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default VideoDetails;
