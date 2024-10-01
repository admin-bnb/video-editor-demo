# Video Editor

This is a React-based video editor that allows users to trim videos and download the trimmed segments. The project uses `ffmpeg` to handle video processing and provides a timeline slider to adjust the start and end times of the video clip.

## Features

- Upload or use a default video file to preview in the player.
- Select start and end points using a timeline slider.
- Download the trimmed video segment.
- Option to add new video URLs via a modal.

## Setup and Installation

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)
- FFmpeg (Ensure `ffmpeg` is installed on your machine. You can install it via `brew install ffmpeg` on macOS or download it from [ffmpeg.org](https://ffmpeg.org/).)

### Installation Steps

1. Clone the repository:

```bash
git clone https://github.com/admin-bnb/video-editor-demo
cd video-editor
```

2. Install dependencies:

```bash
npm install
```

2. Start the development server::

```bash
npm start
```

## Project Structure
- public/index.html: Includes the main HTML file, with Tailwind CSS loaded from CDN.
- src/App.tsx: Main component that manages video playback, timeline slider, and downloading functionality.
- src/components/VideoPlayer.tsx: Video player component responsible for video display and trimming logic.
- src/components/VideoURLModal.tsx: Modal component for adding a new video URL.
- src/helpers/ffmpegHelper.ts: Helper functions for trimming the video using FFmpeg.

## Styling
- Uses Tailwind CSS for utility-first styling.
- Responsive design is implemented for better user experience on smaller screens.

## Usage
- Upload a video file or use the default video (BigBuckBunny.mp4).
- Use the timeline slider to select the start and end points of the video.
- Click the "Download Video" button to download the trimmed video.
- Optionally, click the "Add New Video URL" button to upload a video from a URL.

## Future Enhancements
- Support for more video formats.
- Adding additional video editing features like cropping, rotating, and adjusting speed.
- Improve error handling and add user notifications for different events (e.g., when the video is successfully trimmed).