// VideoUrlModal.tsx
import React, { useState } from 'react';

interface VideoUrlModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (url: string) => void;
}

const VideoUrlModal: React.FC<VideoUrlModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [newVideoUrl, setNewVideoUrl] = useState('');

  const handleVideoUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewVideoUrl(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(newVideoUrl);
    setNewVideoUrl('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-xl font-bold mb-4">Add New Video URL</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={newVideoUrl}
            onChange={handleVideoUrlChange}
            placeholder="Enter video URL"
            className="border border-gray-300 p-2 rounded w-full mb-4"
            required
          />
          <div className="flex justify-end">
            <button type="button" className="mr-2 p-2 bg-gray-300 rounded" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="p-2 bg-blue-500 text-white rounded">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VideoUrlModal;
