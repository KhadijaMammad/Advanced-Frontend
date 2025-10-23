import { useState } from 'react';
import { Plus, X, Folder } from 'lucide-react';

const PRESET_COLORS = [
  '#3B82F6',
  '#10B981',
  '#F59E0B',
  '#EF4444',
  '#8B5CF6',
  '#EC4899',
  '#14B8A6',
  '#F97316',
];

export default function CategoryManager({
  categories,
  onAddCategory,
  onRemoveCategory,
}) {
  const [isAdding, setIsAdding] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [selectedColor, setSelectedColor] = useState(PRESET_COLORS[0]);

  const handleAdd = () => {
    if (newCategoryName.trim()) {
      onAddCategory(newCategoryName.trim(), selectedColor);
      setNewCategoryName('');
      setSelectedColor(PRESET_COLORS[0]);
      setIsAdding(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAdd();
    } else if (e.key === 'Escape') {
      setIsAdding(false);
      setNewCategoryName('');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Folder className="w-5 h-5 text-gray-600" />
          <h2 className="text-lg font-semibold text-gray-800">Categories</h2>
        </div>

        <button
          onClick={() => setIsAdding(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2 text-sm font-medium"
        >
          <Plus className="w-4 h-4" />
          Add Category
        </button>
      </div>

      {isAdding && (
        <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <input
            type="text"
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Category name..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />

          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm text-gray-600">Color:</span>
            <div className="flex gap-2">
              {PRESET_COLORS.map(color => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-8 h-8 rounded-full transition-transform hover:scale-110 ${
                    selectedColor === color ? 'ring-2 ring-offset-2 ring-gray-400' : ''
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleAdd}
              className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium"
            >
              Add
            </button>
            <button
              onClick={() => {
                setIsAdding(false);
                setNewCategoryName('');
              }}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {categories.length === 0 ? (
        <p className="text-gray-400 text-sm text-center py-4">
          No categories yet. Create one to organize your images.
        </p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <div
              key={category.id}
              className="group flex items-center gap-2 px-3 py-2 rounded-full text-white text-sm font-medium transition-all hover:shadow-md"
              style={{ backgroundColor: category.color }}
            >
              <span>{category.name}</span>
              <button
                onClick={() => onRemoveCategory(category.id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/20 rounded-full p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
