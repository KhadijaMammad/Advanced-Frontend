import { useState } from 'react';
import { FileText } from 'lucide-react';
import { DocumentUpload } from '../components/DocumentUpload.jsx';
import { DocumentList } from '../components/DocumentList.jsx';
import { DocumentViewer } from '../components/DocumentViewer.jsx';
import { EditDocumentModal } from '../components/EditModal.jsx';

function MainPage() {
  const [documents, setDocuments] = useState([]);
  const [viewingDocument, setViewingDocument] = useState(null);
  const [editingDocument, setEditingDocument] = useState(null);

  const handleUpload = (document) => {
    setDocuments(prev => [document, ...prev]);
  };

  const handleDelete = (id) => {
    setDocuments(prev => prev.filter(doc => doc.id !== id));
    if (viewingDocument?.id === id) {
      setViewingDocument(null);
    }
  };

  const handleEdit = (updatedDocument) => {
    setDocuments(prev =>
      prev.map(doc => doc.id === updatedDocument.id ? updatedDocument : doc)
    );
    setEditingDocument(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <FileText className="text-white" size={28} />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Document Viewer</h1>
              <p className="text-sm text-gray-600 mt-1">
                Upload, preview, and manage your documents with access controls
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <DocumentUpload onUpload={handleUpload} />
          </div>

          <div>
            <DocumentList
              documents={documents}
              onView={setViewingDocument}
              onEdit={setEditingDocument}
              onDelete={handleDelete}
            />
          </div>
        </div>

        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Access Level Guide</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border-l-4 border-red-500 pl-4">
              <h4 className="font-medium text-gray-900 mb-1">Private</h4>
              <p className="text-sm text-gray-600">
                Document is locked. No viewing or editing allowed. Only download and delete available.
              </p>
            </div>
            <div className="border-l-4 border-yellow-500 pl-4">
              <h4 className="font-medium text-gray-900 mb-1">Read Only</h4>
              <p className="text-sm text-gray-600">
                Document can be viewed and downloaded. Editing metadata is restricted.
              </p>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <h4 className="font-medium text-gray-900 mb-1">Editable</h4>
              <p className="text-sm text-gray-600">
                Full access granted. View, edit metadata, download, and delete allowed.
              </p>
            </div>
          </div>
        </div>
      </main>

      {viewingDocument && (
        <DocumentViewer
          document={viewingDocument}
          onClose={() => setViewingDocument(null)}
        />
      )}

      {editingDocument && (
        <EditDocumentModal
          document={editingDocument}
          onSave={handleEdit}
          onClose={() => setEditingDocument(null)}
        />
      )}
    </div>
  );
}

export default MainPage;
