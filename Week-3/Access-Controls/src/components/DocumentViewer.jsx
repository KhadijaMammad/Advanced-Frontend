import { X, Lock, Eye, Edit3 } from 'lucide-react';


export function DocumentViewer({ document, onClose }) {
  const getAccessIcon = () => {
    switch (document.accessLevel) {
      case 'private':
        return <Lock size={16} className="text-red-600" />;
      case 'read-only':
        return <Eye size={16} className="text-yellow-600" />;
      case 'editable':
        return <Edit3 size={16} className="text-green-600" />;
    }
  };

  const getAccessColor = () => {
    switch (document.accessLevel) {
      case 'private':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'read-only':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'editable':
        return 'bg-green-100 text-green-800 border-green-200';
    }
  };

  const renderPreview = () => {
    if (document.type === 'application/pdf') {
      return (
        <iframe
          src={document.fileUrl}
          className="w-full h-full border-0"
          title={document.name}
        />
      );
    }

    if (document.type.startsWith('image/')) {
      return (
        <div className="flex items-center justify-center h-full bg-gray-50">
          <img
            src={document.fileUrl}
            alt={document.name}
            className="max-w-full max-h-full object-contain"
          />
        </div>
      );
    }

    if (document.type === 'text/plain') {
      return (
        <div className="h-full overflow-auto bg-gray-50 p-6">
          <iframe
            src={document.fileUrl}
            className="w-full h-full border-0"
            title={document.name}
          />
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center justify-center h-full text-gray-500">
        <p className="text-lg mb-2">Preview not available</p>
        <p className="text-sm">This file type cannot be previewed in the browser</p>
        <a
          href={document.fileUrl}
          download={document.name}
          className="mt-4 text-blue-600 hover:text-blue-700 underline"
        >
          Download to view
        </a>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-6xl w-full h-[90vh] flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-800 mb-1">
              {document.name}
            </h2>
            <div className="flex items-center space-x-3 text-sm">
              <span className={`px-2 py-1 rounded border ${getAccessColor()} flex items-center space-x-1`}>
                {getAccessIcon()}
                <span>
                  {document.accessLevel === 'read-only' ? 'Read Only' :
                   document.accessLevel.charAt(0).toUpperCase() + document.accessLevel.slice(1)}
                </span>
              </span>
              <span className="text-gray-500">
                {(document.size / 1024).toFixed(2)} KB
              </span>
              <span className="text-gray-500">
                {new Date(document.uploadedAt).toLocaleDateString()}
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 ml-4"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-hidden">
          {renderPreview()}
        </div>

        {(document.metadata.description || document.metadata.tags.length > 0) && (
          <div className="p-4 border-t border-gray-200 bg-gray-50">
            {document.metadata.description && (
              <div className="mb-2">
                <span className="text-sm font-medium text-gray-700">Description: </span>
                <span className="text-sm text-gray-600">{document.metadata.description}</span>
              </div>
            )}
            {document.metadata.tags.length > 0 && (
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700">Tags:</span>
                <div className="flex flex-wrap gap-2">
                  {document.metadata.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
