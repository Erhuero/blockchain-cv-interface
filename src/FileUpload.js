import React, { useState } from 'react';
import DragAndDrop from './components/DragAndDrop';
import './FileUpload.css';

function FileUpload({ onFilesAdded, onSubmit }) {
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});

  const handleFilesAdded = (newFiles) => {
    setFiles(newFiles);
    onFilesAdded(newFiles);
  };

  return (
    <div className="file-upload">
      <h2>Upload PDF Documents</h2>
      <DragAndDrop onFilesAdded={handleFilesAdded} uploadProgress={uploadProgress} />
      <button type="button" onClick={onSubmit}>Submit</button>
    </div>
  );
}

export default FileUpload;