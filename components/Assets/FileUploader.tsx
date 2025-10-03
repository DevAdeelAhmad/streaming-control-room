'use client';

import { useState, useRef } from 'react';

interface FileUploaderProps {
  onUploadSuccess: (assetUrl: string, assetId: string) => void;
}

export default function FileUploader({ onUploadSuccess }: FileUploaderProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB');
      return;
    }

    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        onUploadSuccess(data.asset.url, data.asset.id);
      } else {
        const error = await response.json();
        alert(error.error || 'Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload file');
    } finally {
      setIsUploading(false);
    }
  }

  function handleDrag(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  }

  return (
    <div>
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept="image/*"
        onChange={handleChange}
        disabled={isUploading}
      />

      <div
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition ${
          dragActive
            ? 'border-purple-500 bg-purple-500/10'
            : 'border-white/20 hover:border-white/40'
        } ${isUploading ? 'opacity-50 pointer-events-none' : 'cursor-pointer'}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        {isUploading ? (
          <div className="space-y-2">
            <div className="animate-spin w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full mx-auto"></div>
            <p className="text-white">Uploading...</p>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="text-4xl">📤</div>
            <p className="text-white font-medium">
              Drop image here or click to upload
            </p>
            <p className="text-sm text-gray-400">
              PNG, JPG, GIF, WebP or SVG (max 10MB)
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

