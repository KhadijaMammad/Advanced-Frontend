import { useState } from 'react';
import { FileText, Eye, Edit2, Trash2, Lock, Download } from 'lucide-react';


export function DocumentList({ documents, onView, onEdit, onDelete }) {
  const [selectedDoc, setSelectedDoc] = useState(null);

  const getAccessBadge = (accessLevel) => {
    const styles = {
      private: 'bg-red-100 text-red-700 border-red-200',
      'read-only': 'bg-yellow-100 text-yellow-700 border-yellow-200',
      editable: 'bg-green-100 text-green-700 border-green-200'
    };

    return (
      <span className={`text-xs px-2 py-1 rounded border ${styles[accessLevel]}`}>
        {accessLevel === 'read-only' ? 'Read Only' :
         accessLevel.charAt(0).toUpperCase() + accessLevel.slice(1)}
      </span>
    );
  };

  const canEdit = (accessLevel) => {
    return accessLevel === 'editable';
  };

  const canView = (accessLevel) => {
    return accessLevel === 'read-only' || accessLevel === 'editable';
  };

  if (documents.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-12 text-center">
        <FileText className="mx-auto text-gray-400 mb-4" size={64} />
        <h3 className="text-xl font-semibold text-gray-700 mb-2">No documents yet</h3>
        <p className="text-gray-500">Upload your first document to get started</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800">My Documents</h2>
        <p className="text-sm text-gray-500 mt-1">{documents.length} document{documents.length !== 1 ? 's' : ''}</p>
      </div>

      <div className="divide-y divide-gray-200">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className={`p-4 hover:bg-gray-50 transition-colors ${selectedDoc === doc.id ? 'bg-blue-50' : ''}`}
            onMouseEnter={() => setSelectedDoc(doc.id)}
            onMouseLeave={() => setSelectedDoc(null)}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3 flex-1 min-w-0">
                <div className="flex-shrink-0 mt-1">
                  <FileText className="text-gray-400" size={24} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-gray-800 truncate">{doc.name}</h3>
                  <div className="flex items-center space-x-3 mt-1 text-sm text-gray-500">
                    <span>{(doc.size / 1024).toFixed(2)} KB</span>
                    <span>•</span>
                    <span>{new Date(doc.uploadedAt).toLocaleDateString()}</span>
                    <span>•</span>
                    {getAccessBadge(doc.accessLevel)}
                  </div>
                  {doc.metadata.description && (
                    <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                      {doc.metadata.description}
                    </p>
                  )}
                  {doc.metadata.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {doc.metadata.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-2 ml-4">
                {doc.accessLevel === 'private' ? (
                  <button
                    disabled
                    className="p-2 text-gray-300 cursor-not-allowed"
                    title="Private - No actions available"
                  >
                    <Lock size={18} />
                  </button>
                ) : (
                  <>
                    {canView(doc.accessLevel) && (
                      <button
                        onClick={() => onView(doc)}
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded transition-colors"
                        title="View document"
                      >
                        <Eye size={18} />
                      </button>
                    )}
                    {canEdit(doc.accessLevel) && (
                      <button
                        onClick={() => onEdit(doc)}
                        className="p-2 text-green-600 hover:bg-green-100 rounded transition-colors"
                        title="Edit metadata"
                      >
                        <Edit2 size={18} />
                      </button>
                    )}
                  </>
                )}
                <a
                  href={doc.fileUrl}
                  download={doc.name}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded transition-colors"
                  title="Download"
                >
                  <Download size={18} />
                </a>
                <button
                  onClick={() => {
                    if (confirm(`Delete "${doc.name}"?`)) {
                      onDelete(doc.id);
                    }
                  }}
                  className="p-2 text-red-600 hover:bg-red-100 rounded transition-colors"
                  title="Delete"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
