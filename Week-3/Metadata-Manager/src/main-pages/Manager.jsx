import { useState, useEffect } from 'react';
import { Image as ImageIcon, Download, Trash2 } from 'lucide-react';
import CategoryManager from '../components/CategoryManager';
import ImageUpload from '../components/ImageUpload';
import ImageCard from '../components/ImageCard';


function Manager() {
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filterCategory, setFilterCategory] = useState('all');

  const handleUpload = (files) => {
    const newImages = files.map(file => ({
      id: crypto.randomUUID(),
      file,
      preview: URL.createObjectURL(file),
      name: file.name.replace(/\.[^/.]+$/, ''),
      originalName: file.name,
      type: file.type,
      size: file.size,
      uploadedAt: new Date(),
    }));

    setImages(prev => [...prev, ...newImages]);
  };

  const handleRemove = (id) => {
    const image = images.find(img => img.id === id);
    if (image) {
      URL.revokeObjectURL(image.preview);
    }
    setImages(prev => prev.filter(img => img.id !== id));
  };

  const handleRename = (id, newName) => {
    setImages(prev =>
      prev.map(img =>
        img.id === id ? { ...img, name: newName } : img
      )
    );
  };

  const handleCategoryChange = (id, categoryId) => {
    setImages(prev =>
      prev.map(img =>
        img.id === id ? { ...img, category: categoryId } : img
      )
    );
  };

  const handleAddCategory = (name, color) => {
    const newCategory = {
      id: crypto.randomUUID(),
      name,
      color,
    };
    setCategories(prev => [...prev, newCategory]);
  };

  const handleRemoveCategory = (id) => {
    setCategories(prev => prev.filter(cat => cat.id !== id));
    setImages(prev =>
      prev.map(img =>
        img.category === id ? { ...img, category: undefined } : img
      )
    );
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to remove all images?')) {
      images.forEach(img => URL.revokeObjectURL(img.preview));
      setImages([]);
    }
  };

  const handleExportMetadata = () => {
    const metadata = images.map(img => ({
      name: img.name,
      originalName: img.originalName,
      type: img.type,
      size: img.size,
      category: categories.find(cat => cat.id === img.category)?.name || 'None',
      uploadedAt: img.uploadedAt.toISOString(),
    }));

    const blob = new Blob([JSON.stringify(metadata, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `image-metadata-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    return () => {
      images.forEach(img => URL.revokeObjectURL(img.preview));
    };
  }, []);

  const filteredImages = filterCategory === 'all'
    ? images
    : filterCategory === 'uncategorized'
    ? images.filter(img => !img.category)
    : images.filter(img => img.category === filterCategory);

  const getTotalSize = () => {
    const total = images.reduce((sum, img) => sum + img.size, 0);
    if (total < 1024 * 1024) return (total / 1024).toFixed(2) + ' KB';
    return (total / (1024 * 1024)).toFixed(2) + ' MB';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 bg-blue-500 rounded-xl">
              <ImageIcon className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800">
              Image Manager
            </h1>
          </div>
          <p className="text-gray-600 ml-16">
            Upload, organize, and manage your images with metadata tracking
          </p>
        </header>

        <div className="grid gap-6 mb-8">
          <CategoryManager
            categories={categories}
            onAddCategory={handleAddCategory}
            onRemoveCategory={handleRemoveCategory}
          />

          {images.length === 0 ? (
            <ImageUpload onUpload={handleUpload} />
          ) : (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-6">
                    <div>
                      <p className="text-sm text-gray-500">Total Images</p>
                      <p className="text-2xl font-bold text-gray-800">{images.length}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Total Size</p>
                      <p className="text-2xl font-bold text-gray-800">{getTotalSize()}</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={handleExportMetadata}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2 text-sm font-medium"
                    >
                      <Download className="w-4 h-4" />
                      Export Metadata
                    </button>
                    <button
                      onClick={handleClearAll}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center gap-2 text-sm font-medium"
                    >
                      <Trash2 className="w-4 h-4" />
                      Clear All
                    </button>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Filter by Category
                  </label>
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="all">All Images ({images.length})</option>
                    <option value="uncategorized">
                      Uncategorized ({images.filter(img => !img.category).length})
                    </option>
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name} ({images.filter(img => img.category === cat.id).length})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Add More Images</h2>
                <ImageUpload onUpload={handleUpload} />
              </div>

              {filteredImages.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                  <p className="text-gray-400">No images in this category</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredImages.map(image => (
                    <ImageCard
                      key={image.id}
                      image={image}
                      categories={categories}
                      onRemove={handleRemove}
                      onRename={handleRename}
                      onCategoryChange={handleCategoryChange}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Manager;
