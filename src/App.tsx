import React, { useState, useRef } from 'react';
import TimeRange from 'react-video-timelines-slider';
import { format } from 'date-fns';
import VideoPlayer from './components/VideoPlayer';
import { createTrimmedVideo } from './helpers/ffmpegHelper';
import './App.css';
import VideoUrlModal from './components/VideoURLModal';

const App: React.FC = () => {
  const videoSrcInitial = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';
  const [videoSrc, setVideoSrc] = useState(videoSrcInitial);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [videoDuration, setVideoDuration] = useState<number>(0);
  const [selectedInterval, setSelectedInterval] = useState<[Date, Date]>([
    new Date(0),
    new Date(120000)
  ]);
  const [timelineScrubberError, setTimelineScrubberError] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMetadataLoaded = () => {
    if (videoRef.current) {
      const durationInMs = videoRef.current.duration * 1000;
      setVideoDuration(durationInMs);
      setSelectedInterval([new Date(0), new Date(durationInMs > 120000 ? 120000 : durationInMs)]);
    }
  };

  const timelineScrubberErrorHandler = ({ error }: { error: boolean }) => {
    setTimelineScrubberError(error);
  };

  const onChangeCallback = (selectedInterval: Date[]) => {
    setSelectedInterval(selectedInterval as [Date, Date]);
  };

  const trimStart = (selectedInterval[0].getTime() / 1000).toFixed(2);
  const trimEnd = (selectedInterval[1].getTime() / 1000).toFixed(2);

  const handleDownload = async () => {
    setDownloading(true);
    try {
      await createTrimmedVideo(videoSrc, parseFloat(trimStart), parseFloat(trimEnd));
    } catch (error) {
      console.error('Error trimming video:', error);
    } finally {
      setDownloading(false);
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const handleVideoUrlSubmit = (url: string) => {
    setVideoSrc(url);
  };

  return (
    <div className="app app-scroll">
      {/* Video Player */}
      <div className="video-player">
        <VideoPlayer videoSrc={videoSrc} trimStart={parseFloat(trimStart)} trimEnd={parseFloat(trimEnd)} />
      </div>

      {/* Hidden video element to extract video metadata */}
      <video
        ref={videoRef}
        src={videoSrc}
        onLoadedMetadata={handleMetadataLoaded}
        style={{ display: 'none' }}
      />
      
      <div className="timeline-wrap">
        {/* Timeline Slider */}
        {videoDuration > 0 && (
          <div className="timeline-container">
            <TimeRange
              showNow={false}
              error={timelineScrubberError}
              ticksNumber={10}
              selectedInterval={selectedInterval}
              timelineInterval={[new Date(0), new Date(videoDuration)]}
              onUpdateCallback={timelineScrubberErrorHandler}
              onChangeCallback={onChangeCallback}
              step={1000} 
              formatTick={(ms: number) => format(new Date(ms), 'mm:ss')}
              formatTooltip={(ms: number) => format(new Date(ms), 'mm:ss.SSS')}
              showToolTip={true}
            />
          </div>
        )}

        {/* Download Button */}
        <button className="download-button" onClick={handleDownload}>
          {downloading ? 'Downloading...' : 'Download Video'}
        </button>

        {/* Button to Open Modal */}
        <button className="mt-4 p-2 bg-blue-500 text-white rounded fixed top-3 right-5 z-10 opacity-50 hover:opacity-100 transition-opacity duration-300" onClick={openModal}>
          Add New Video URL
        </button>

      </div>

      {/* Video URL Modal */}
      <VideoUrlModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSubmit={handleVideoUrlSubmit}
      />
    </div>
  );
};

export default App;
