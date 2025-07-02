import React from "react";
import ReactPlayer from "react-player";

const StoryOverlay = ({ story }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <ReactPlayer url={story.videoUrl} playing controls width="80%" />
    </div>
  );
};

export default StoryOverlay;
