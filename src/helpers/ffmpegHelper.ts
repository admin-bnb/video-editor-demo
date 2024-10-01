import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

const ffmpeg = createFFmpeg({ log: true });

export const createTrimmedVideo = async (videoSrc: string, start: number, end: number) => {
  if (!ffmpeg.isLoaded()) {
    await ffmpeg.load();
  }

  // Fetch the video
  const videoFile = await fetchFile(videoSrc);

  // Write the video file to the ffmpeg file system
  ffmpeg.FS('writeFile', 'input.mp4', videoFile);

  // Use ffmpeg to trim the video
  const trimDuration = end - start;
  await ffmpeg.run('-i', 'input.mp4', '-ss', `${start}`, '-t', `${trimDuration}`, '-c', 'copy', 'output.mp4');

  // Read the trimmed video
  const data = ffmpeg.FS('readFile', 'output.mp4');

  // Create a URL for the trimmed video and download it
  const url = URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' }));
  const a = document.createElement('a');
  a.href = url;
  a.download = 'trimmed-video.mp4';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  // Clean up the ffmpeg file system
  ffmpeg.FS('unlink', 'input.mp4');
  ffmpeg.FS('unlink', 'output.mp4');
};
