import React from "react";
import { X } from "lucide-react";
import axios from "axios";

const StoryViewerDialog = ({ stories, currentIndex, onClose }) => {
  const [index, setIndex] = React.useState(currentIndex);

  const goPrev = () => {
    if (index > 0) setIndex(index - 1);
  };

  const goNext = () => {
    if (index < stories.length - 1) setIndex(index + 1);
  };

  React.useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [index]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
      <button onClick={onClose} className="absolute top-4 right-4 text-white">
        <X size={32} />
      </button>

      <div className="flex items-center w-full max-w-4xl">
        {index > 0 && (
          <div
            onClick={goPrev}
            className="flex-1 cursor-pointer h-full flex items-center justify-center"
          >
            <img src={stories[index - 1].url} alt="prev" className="w-20 h-20 object-cover rounded" />
          </div>
        )}

        <div className="flex-shrink-0 w-3/5 max-h-[80vh]">
          <img src={stories[index].url} alt="current" className="w-full h-full object-contain rounded" />
        </div>

        {index < stories.length - 1 && (
          <div
            onClick={goNext}
            className="flex-1 cursor-pointer h-full flex items-center justify-center"
          >
            <img src={stories[index + 1].url} alt="next" className="w-20 h-20 object-cover rounded" />
          </div>
        )}
      </div>
    </div>
  );
};

export default StoryViewerDialog;
