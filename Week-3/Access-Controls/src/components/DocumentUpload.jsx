import { useState } from 'react';
import { Upload, X } from 'lucide-react';

export function DocumentUpload({ onUpload }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [accessLevel, setAccessLevel] = useState('private');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const handleFileSelect = (file) => {
    const validTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain',
      'image/jpeg',
      'image/png'
    ];

    if (validTypes.includes(file.type)) {
      setSelectedFile(file);
    } else {
      alert('Please select a PDF, DOCX, TXT, or image file');
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleUpload = () => {
    if (!selectedFile) return;

    const fileUrl = URL.createObjectURL(selectedFile);

    const newDocument = {
      id: crypto.randomUUID(),
      name: selectedFile.name,
      type: selectedFile.type,
      size: selectedFile.size,
      accessLevel,
      uploadedAt: new Date(),
      fileUrl,
      metadata: {
        description,
        tags: tags.split(',').map(tag => tag.trim()).filter(Boolean)
      }
    };

    onUpload(newDocument);

    setSelectedFile(null);
    setAccessLevel('private');
    setDescription('');
    setTags('');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Upload Document</h2>

      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`}
      >
        {selectedFile ? (
          <div className="flex items-center justify-between bg-gray-50 p-4 rounded">
            <div className="flex items-center space-x-3">
              <Upload className="text-green-600" size={24} />
              <div className="text-left">
                <p className="font-medium text-gray-800">{selectedFile.name}</p>
                <p className="text-sm text-gray-500">
                  {(selectedFile.size / 1024).toFixed(2)} KB
                </p>
              </div>
            </div>
            <button
              onClick={() => setSelectedFile(null)}
              className="text-red-500 hover:text-red-700"
            >
              <X size={20} />
            </button>
          </div>
        ) : (
          <div>
            <Upload className="mx-auto text-gray-400 mb-3" size={48} />
            <p className="text-gray-600 mb-2">Drag and drop your file here</p>
            <p className="text-sm text-gray-500 mb-4">or</p>
            <label className="cursor-pointer">
              <span className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors inline-block">
                Browse Files
              </span>
              <input
                type="file"
                className="hidden"
                accept=".pdf,.docx,.txt,.jpg,.jpeg,.png"
                onChange={(e) => e.target.files && handleFileSelect(e.target.files[0])}
              />
            </label>
          </div>
        )}
      </div>

      {selectedFile && (
        <div className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Access Level
            </label>
            <div className="grid grid-cols-3 gap-3">
              {['private', 'read-only', 'editable'].map((level) => (
                <button
                  key={level}
                  onClick={() => setAccessLevel(level)}
                  className={`py-2 px-4 rounded-lg border-2 transition-all ${accessLevel === level ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-300 hover:border-gray-400'}`}
                >
                  {level === 'read-only' ? 'Read Only' : level.charAt(0).toUpperCase() + level.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description (Optional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Add a description..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={2}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags (Optional, comma-separated)
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="e.g., work, important, draft"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={handleUpload}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Upload Document
          </button>
        </div>
      )}
    </div>
  );
}
