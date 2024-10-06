import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import './DragAndDrop.css';

const DragAndDrop = ({ onFilesAdded }) => {
  const [files, setFiles] = useState([]);

  const onDrop = useCallback((acceptedFiles, fileRejections) => {
    if (acceptedFiles.length + files.length > 5) {
      alert('You can only upload up to 5 files');
      return;
    }

    const validFiles = acceptedFiles.filter(file => file.size <= 100 * 1024 * 1024);
    if (validFiles.length !== acceptedFiles.length) {
      alert('Each file must be less than 100 MB');
      return;
    }

    const newFiles = [...files, ...validFiles];
    setFiles(newFiles);
    onFilesAdded(newFiles);
  }, [files, onFilesAdded]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'application/pdf',
    maxFiles: 5,
    maxSize: 100 * 1024 * 1024
  });

  const handleDelete = (fileName) => {
    const updatedFiles = files.filter(file => file.name !== fileName);
    setFiles(updatedFiles);
    onFilesAdded(updatedFiles);
  };

  return (
    <div className="dropzone-container">
      <div className="instructions">
        <p>Drag 'n' drop some files here, or click to select files (PDF only, max 5 files, max 100 MB each)</p>
      </div>
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drop files here or click to upload</p>
        )}
      </div>
      <div className="file-list">
        {files.map(file => (
          <div key={file.name} className="file-item">
            <span>{file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
            <button className="delete-button" onClick={() => handleDelete(file.name)}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 6h18M9 6V4a2 2 0 012-2h2a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H8a2 2 0 01-2-2V6h12z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DragAndDrop;