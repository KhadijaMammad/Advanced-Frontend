import { useRef, useState } from 'react';
import { Upload } from 'lucide-react';

export default function ImageUpload({ onUpload }) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files).filter(file =>
      file.type.startsWith('image/')
    );

    if (files.length > 0) {
      onUpload(files);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      onUpload(files);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`relative border-2 border-dashed rounded-xl p-12 transition-all cursor-pointer
        ${isDragging
          ? 'border-blue-500 bg-blue-50'
          : 'border-gray-300 hover:border-gray-400 bg-white'
        }`}
    >
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      <div className="flex flex-col items-center justify-center text-center">
        <div className={`mb-4 p-4 rounded-full ${isDragging ? 'bg-blue-100' : 'bg-gray-100'}`}>
          <Upload className={`w-12 h-12 ${isDragging ? 'text-blue-500' : 'text-gray-400'}`} />
        </div>

        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          {isDragging ? 'Drop images here' : 'Upload Images'}
        </h3>

        <p className="text-gray-500 mb-4">
          Drag and drop images here, or click to browse
        </p>

        <p className="text-sm text-gray-400">
          Supports: JPG, PNG, GIF, WebP
        </p>
      </div>
    </div>
  );
}
