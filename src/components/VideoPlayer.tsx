import React from 'react';
import { VideoJS } from './VideoJS';

interface VideoPlayerProps {
  videoSrc: string;
  trimStart: number;
  trimEnd: number;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoSrc, trimStart, trimEnd }) => {
  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: videoSrc,
        type: 'video/mp4',
      },
    ],
  };

  return (
    <div>
      <VideoJS
        options={videoJsOptions}
        onReady={(player: any) => {
          // Start from the trimStart
          player.currentTime(trimStart);

          player.on('timeupdate', () => {
            if (player.currentTime() >= trimEnd) {
              player.pause(); // Pause the video once it reaches trimEnd
            }
          });
        }}
      />
    </div>
  );
};

export default VideoPlayer;
