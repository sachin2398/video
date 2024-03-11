import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiFillHeart, AiFillLike } from "react-icons/ai";
import VideoLength from "../Shared/videoLength";

const VideoCard = ({ video, currentPage }) => {
  const [isLiked, setIsLiked] = useState(video?.reaction?.voted || false);
  const [likeCount, setLikeCount] = useState(video?.reaction?.count || 0);
  const [commentCount, setCommentCount] = useState(video?.comment?.count || 0);

  const [comments, setComments] = useState([]);
  const videoTimeInSeconds = 840; // hardcoded, dynamic approach found using flv lib for frontend

  const handleLike = (e) => {
    e.preventDefault();
    setIsLiked((prevIsLiked) => !prevIsLiked);
    setLikeCount((prevLikeCount) =>
      isLiked ? prevLikeCount - 1 : prevLikeCount + 1
    );
  };

  return (
    <Link to={`/video/${video?.postId}?page=${currentPage}`}>
      <div className="bg-gray-900 bg-opacity-90 text-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300 h-auto md:h-120">
        <div className="relative h-72 md:h-96 overflow-hidden flex items-center justify-center">
          {video?.submission?.thumbnail && (
            <img
              className="h-full w-full object-cover rounded-t-lg transition-transform transform hover:scale-105"
              src={video.submission.thumbnail}
              alt="Video Thumbnail"
            />
          )}
          <VideoLength time={videoTimeInSeconds} />
        </div>
        <div className="px-4 py-3">
          <div className="flex items-center mb-2">
            <div className="flex-shrink-0 h-10 w-10 rounded-full overflow-hidden">
              {video?.creator?.pic && (
                <img
                  className="h-full w-full object-cover rounded-full"
                  src={video.creator.pic}
                  alt="Creator's Avatar"
                />
              )}
            </div>
            <div className="ml-3">
              <h6 className="font-semibold">{video.creator.handle}</h6>
            </div>
          </div>
          {video?.submission?.title && (
            <h2 className="text-lg font-semibold mb-1">
              {video.submission.title}
            </h2>
          )}

          {/* Comments Section */}
          <div className="text-sm text-gray-400 mb-2">
            {comments.map((comment) => (
              <div key={comment.id}>{comment.text}</div>
            ))}
          </div>
          <div className="flex justify-between text-sm text-gray-400 items-center">
            <div className="cursor-pointer hover:text-white rounded-md p-2 bg-blue-500">
              <span className="ml-1">Comments</span>
            </div>
            <div
              className="cursor-pointer hover:text-white rounded-md p-2 flex items-center"
              onClick={handleLike}
            >
              <span className={`text-xl pr-1 ${isLiked ? "text-red-600" : ""}`}>
                {isLiked ? <AiFillHeart /> : <AiFillLike />}
              </span>
              <span>{likeCount}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
