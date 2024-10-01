import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

export const VideoJS = (props) => {
    const videoRef = useRef(null);
    const playerRef = useRef(null);
    const { options, onReady } = props;

    useEffect(() => {
        // Ensure the player is initialized only once
        if (!playerRef.current) {
            // Create the Video.js player inside the ref container
            const videoElement = document.createElement("video-js");
            videoElement.classList.add('vjs-big-play-centered');
            videoRef.current.appendChild(videoElement);

            // Initialize the Video.js player
            const player = playerRef.current = videojs(videoElement, options, () => {
                videojs.log('player is ready');
                onReady && onReady(player);
            });
        } else {
            // Update the existing player
            const player = playerRef.current;
            player.autoplay(options.autoplay);
            player.src(options.sources); // Ensure this has valid sources
        }

        // Cleanup on component unmount
        return () => {
            const player = playerRef.current;
            if (player && !player.isDisposed()) {
                player.dispose();
                playerRef.current = null;
            }
        };
    }, [options]);

    return (
        <div data-vjs-player>
            <div ref={videoRef} />
        </div>
    );
}

export default VideoJS;