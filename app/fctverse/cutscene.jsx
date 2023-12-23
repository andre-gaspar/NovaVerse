import React from 'react';

const VideoCutscene = ({ videoPath, onFinish }) => {
  const handleEnded = () => {
    onFinish();
  };

  return (
    <div>
      <video
        src={videoPath}
        type="video/mp4"
        autoPlay
        playsInline
        muted
        onEnded={handleEnded}
      />
    </div>
  );
};

export default VideoCutscene;