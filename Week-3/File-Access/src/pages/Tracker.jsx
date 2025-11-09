import React, { useState } from 'react';
import { Download, Eye, Lock, RefreshCw, Settings, FileText, Image, Film, Music } from 'lucide-react';

const FileAccessTracker = () => {
  const [files, setFiles] = useState([
    { id: 1, name: 'Project_Proposal.pdf', type: 'document', size: '2.4 MB', views: 0, downloads: 0, limit: 3, icon: FileText },
    { id: 2, name: 'Design_Mockup.png', type: 'image', size: '1.8 MB', views: 1, downloads: 0, limit: 3, icon: Image },
    { id: 3, name: 'Tutorial_Video.mp4', type: 'video', size: '45.2 MB', views: 2, downloads: 1, limit: 3, icon: Film },
    { id: 4, name: 'Background_Music.mp3', type: 'audio', size: '5.6 MB', views: 0, downloads: 2, limit: 3, icon: Music },
    { id: 5, name: 'Report_Q4.pdf', type: 'document', size: '3.1 MB', views: 3, downloads: 3, limit: 3, icon: FileText },
    { id: 6, name: 'Logo_Final.svg', type: 'image', size: '0.8 MB', views: 1, downloads: 1, limit: 5, icon: Image },
  ]);

  const [editingLimit, setEditingLimit] = useState(null);
  const [newLimit, setNewLimit] = useState('');

  const isLocked = (file) => file.downloads >= file.limit;

  const handleView = (fileId) => {
    setFiles(files.map(file => 
      file.id === fileId && !isLocked(file)
        ? { ...file, views: file.views + 1 }
        : file
    ));
  };

  const handleDownload = (fileId) => {
    setFiles(files.map(file => 
      file.id === fileId && !isLocked(file)
        ? { ...file, downloads: file.downloads + 1 }
        : file
    ));
  };

  const handleReset = (fileId) => {
    setFiles(files.map(file => 
      file.id === fileId
        ? { ...file, views: 0, downloads: 0 }
        : file
    ));
  };

  const handleLimitEdit = (fileId) => {
    const file = files.find(f => f.id === fileId);
    setEditingLimit(fileId);
    setNewLimit(file.limit.toString());
  };

  const handleLimitSave = (fileId) => {
    const limit = parseInt(newLimit);
    if (!isNaN(limit) && limit > 0) {
      setFiles(files.map(file => 
        file.id === fileId
          ? { ...file, limit }
          : file
      ));
    }
    setEditingLimit(null);
    setNewLimit('');
  };

  const handleLimitCancel = () => {
    setEditingLimit(null);
    setNewLimit('');
  };

  const getProgressPercentage = (file) => {
    return (file.downloads / file.limit) * 100;
  };

  const getProgressColor = (percentage) => {
    if (percentage >= 100) return 'bg-red-500';
    if (percentage >= 66) return 'bg-orange-500';
    if (percentage >= 33) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const totalFiles = files.length;
  const lockedFiles = files.filter(isLocked).length;
  const totalDownloads = files.reduce((sum, file) => sum + file.downloads, 0);
  const totalViews = files.reduce((sum, file) => sum + file.views, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">File Access Tracker</h1>
          <p className="text-purple-300">Monitor and control file access with download limits</p>
        </div>

        {/* Statistics Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-300 text-sm">Total Files</p>
                <p className="text-3xl font-bold text-white">{totalFiles}</p>
              </div>
              <FileText className="w-10 h-10 text-purple-400" />
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-300 text-sm">Total Views</p>
                <p className="text-3xl font-bold text-white">{totalViews}</p>
              </div>
              <Eye className="w-10 h-10 text-blue-400" />
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-300 text-sm">Total Downloads</p>
                <p className="text-3xl font-bold text-white">{totalDownloads}</p>
              </div>
              <Download className="w-10 h-10 text-green-400" />
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-300 text-sm">Locked Files</p>
                <p className="text-3xl font-bold text-white">{lockedFiles}</p>
              </div>
              <Lock className="w-10 h-10 text-red-400" />
            </div>
          </div>
        </div>

        {/* Files List */}
        <div className="space-y-4">
          {files.map(file => {
            const FileIcon = file.icon;
            const locked = isLocked(file);
            const progress = getProgressPercentage(file);
            const progressColor = getProgressColor(progress);

            return (
              <div 
                key={file.id} 
                className={`bg-white/10 backdrop-blur-md rounded-lg p-6 border transition-all ${
                  locked 
                    ? 'border-red-500/50 bg-red-900/20' 
                    : 'border-white/20 hover:border-purple-400/50'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4 flex-1">
                    <div className={`p-3 rounded-lg ${locked ? 'bg-red-500/20' : 'bg-purple-500/20'}`}>
                      <FileIcon className={`w-6 h-6 ${locked ? 'text-red-400' : 'text-purple-400'}`} />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-semibold text-white">{file.name}</h3>
                        {locked && (
                          <span className="flex items-center gap-1 px-2 py-1 bg-red-500/20 rounded text-red-400 text-xs font-medium">
                            <Lock className="w-3 h-3" />
                            LOCKED
                          </span>
                        )}
                      </div>
                      <p className="text-purple-300 text-sm mb-3">{file.size}</p>

                      {/* Progress Bar */}
                      <div className="mb-3">
                        <div className="flex justify-between text-xs text-purple-300 mb-1">
                          <span>Downloads: {file.downloads}/{file.limit}</span>
                          <span>{Math.round(progress)}%</span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
                          <div 
                            className={`h-full transition-all duration-500 ${progressColor}`}
                            style={{ width: `${Math.min(progress, 100)}%` }}
                          />
                        </div>
                      </div>

                      {/* Stats */}
                      <div className="flex items-center gap-4 text-sm text-purple-300">
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {file.views} views
                        </span>
                        <span className="flex items-center gap-1">
                          <Download className="w-4 h-4" />
                          {file.downloads} downloads
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Limit Editor */}
                  <div className="flex items-center gap-2">
                    {editingLimit === file.id ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min="1"
                          value={newLimit}
                          onChange={(e) => setNewLimit(e.target.value)}
                          className="w-16 px-2 py-1 bg-white/10 border border-white/20 rounded text-white text-sm"
                          placeholder="Limit"
                        />
                        <button
                          onClick={() => handleLimitSave(file.id)}
                          className="px-3 py-1 bg-green-500 hover:bg-green-600 text-white text-sm rounded transition-colors"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleLimitCancel}
                          className="px-3 py-1 bg-gray-500 hover:bg-gray-600 text-white text-sm rounded transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleLimitEdit(file.id)}
                        className="p-2 bg-white/10 hover:bg-white/20 text-purple-300 hover:text-purple-200 rounded transition-colors"
                        title="Edit limit"
                      >
                        <Settings className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => handleView(file.id)}
                    disabled={locked}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      locked
                        ? 'bg-gray-600/50 text-gray-400 cursor-not-allowed'
                        : 'bg-blue-500 hover:bg-blue-600 text-white'
                    }`}
                  >
                    <Eye className="w-4 h-4" />
                    Preview
                  </button>
                  
                  <button
                    onClick={() => handleDownload(file.id)}
                    disabled={locked}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      locked
                        ? 'bg-gray-600/50 text-gray-400 cursor-not-allowed'
                        : 'bg-green-500 hover:bg-green-600 text-white'
                    }`}
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                  
                  <button
                    onClick={() => handleReset(file.id)}
                    className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors flex items-center gap-2"
                    title="Reset access"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Reset
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Info */}
        <div className="mt-8 text-center text-purple-300 text-sm">
          <p>Files are locked automatically when download limit is reached</p>
          <p className="mt-1">Use Reset to restore access or Settings to change the limit per file</p>
        </div>
      </div>
    </div>
  );
};

export default FileAccessTracker;