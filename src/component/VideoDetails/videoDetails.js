import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { AiFillHeart, AiFillLike, AiOutlineComment } from "react-icons/ai";

const VideoDetails = () => {
  const { id } = useParams(); // Video ID
  const [video, setVideo] = useState(null);
  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const [comments, setComments] = useState([]);
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
          setLikeCount(videoPost?.reaction?.count || 0);
          setIsLiked(videoPost?.reaction?.voted || false);
          setComments(videoPost?.comments || []);
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

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount((prevCount) => (isLiked ? prevCount - 1 : prevCount + 1));
    // Simulate API call to update like status
    // You can implement an actual API call here
  };

  const handleCommentChange = (e) => {
    setCommentInput(e.target.value);
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentInput.trim() !== "") {
      // Add comment to the comments list
      setComments((prevComments) => [
        ...prevComments,
        { id: prevComments.length + 1, text: commentInput },
      ]);
      // Clear comment input
      setCommentInput("");
      // Simulate API call to submit comment
      // You can implement an actual API call here
    }
  };

  return (
    <div className="h-full bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="relative" style={{ paddingBottom: "56.25%" }}>
          <video
            controls
            className="absolute inset-0 w-full h-full rounded-lg"
            src={video?.submission?.mediaUrl}
            type="video/mp4"
            autoPlay
          />
        </div>
        <div className="mt-8">
          <h1 className="text-2xl md:text-4xl font-semibold mb-4">
            {video?.submission?.title}
          </h1>
          <div className="flex items-center mb-4">
            <div className="h-10 w-10 rounded-full overflow-hidden">
              <img
                className="h-full w-full object-cover"
                src={video?.creator?.pic}
                alt="Author Avatar"
              />
            </div>
            <span className="text-sm ml-2">{video?.creator?.name}</span>
          </div>
          <p className="text-sm md:text-base leading-relaxed">
            {video?.submission?.description}
          </p>
          {/* Like and Comment Section */}
          <div className="flex justify-between text-sm text-gray-400 items-center mt-6">
            <div
              className="cursor-pointer hover:text-white rounded-md p-2 flex items-center"
              onClick={handleLike}
            >
              <span className={`text-xl pr-1 ${isLiked ? "text-red-600" : ""}`}>
                {isLiked ? <AiFillHeart /> : <AiFillLike />}
              </span>
              <span>{likeCount}</span>
            </div>
            <div
              className="cursor-pointer hover:text-white rounded-md p-2 bg-blue-500"
              onClick={handleCommentSubmit}
            >
              <span className="ml-1">Comment</span>
            </div>
          </div>
          {/* Comments Section */}
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Comments</h3>
            {comments.map((comment) => (
              <div key={comment.id} className="text-sm text-gray-400 mb-2">
                {comment.text}
              </div>
            ))}
          </div>
          {/* Comment Input */}
          <form onSubmit={handleCommentSubmit}>
            <input
              type="text"
              value={commentInput}
              onChange={handleCommentChange}
              className="w-full p-2 mt-4 bg-gray-800 rounded-md text-white"
              placeholder="Add a comment..."
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default VideoDetails;
