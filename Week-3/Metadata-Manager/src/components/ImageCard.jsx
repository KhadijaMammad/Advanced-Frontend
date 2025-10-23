import { useState } from 'react';
import { X, Edit2, Check, Tag } from 'lucide-react';

export default function ImageCard({
  image,
  categories,
  onRemove,
  onRename,
  onCategoryChange,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(image.name);

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  const handleSaveName = () => {
    if (editedName.trim() && editedName !== image.name) {
      onRename(image.id, editedName.trim());
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSaveName();
    } else if (e.key === 'Escape') {
      setEditedName(image.name);
      setIsEditing(false);
    }
  };

  const currentCategory = categories.find(cat => cat.id === image.category);

  return (
    <div className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden border border-gray-200">
      <div className="relative aspect-square bg-gray-100 overflow-hidden">
        <img
          src={image.preview}
          alt={image.name}
          className="w-full h-full object-cover"
        />

        <button
          onClick={() => onRemove(image.id)}
          className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
          title="Remove image"
        >
          <X className="w-4 h-4" />
        </button>

        {currentCategory && (
          <div
            className="absolute top-2 left-2 px-3 py-1 rounded-full text-xs font-medium text-white"
            style={{ backgroundColor: currentCategory.color }}
          >
            {currentCategory.name}
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-3">
          {isEditing ? (
            <div className="flex items-center gap-2 flex-1">
              <input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                onKeyDown={handleKeyDown}
                onBlur={handleSaveName}
                className="flex-1 px-2 py-1 border border-blue-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                autoFocus
              />
              <button
                onClick={handleSaveName}
                className="p-1 text-green-600 hover:bg-green-50 rounded"
              >
                <Check className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <>
              <h3 className="font-medium text-gray-800 truncate flex-1" title={image.name}>
                {image.name}
              </h3>
              <button
                onClick={() => setIsEditing(true)}
                className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded flex-shrink-0"
                title="Rename"
              >
                <Edit2 className="w-4 h-4" />
              </button>
            </>
          )}
        </div>

        <div className="space-y-2 text-sm text-gray-500">
          <div className="flex items-center justify-between">
            <span className="text-xs">Type:</span>
            <span className="font-medium text-gray-700">{image.type}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs">Size:</span>
            <span className="font-medium text-gray-700">{formatFileSize(image.size)}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs">Uploaded:</span>
            <span className="font-medium text-gray-700">
              {image.uploadedAt.toLocaleTimeString()}
            </span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100">
          <label className="flex items-center gap-2 text-xs text-gray-600 mb-2">
            <Tag className="w-3 h-3" />
            Category
          </label>
          <select
            value={image.category || ''}
            onChange={(e) => onCategoryChange(image.id, e.target.value || undefined)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          >
            <option value="">No category</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
