import React, { useState } from 'react';
import DragAndDrop from './components/DragAndDrop';
import './FileUpload.css';

function FileUpload() {
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});

  const handleFilesAdded = (newFiles) => {
    setFiles(newFiles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (files.length === 0) {
      alert('Please upload at least one file');
      return;
    }

    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append(`file${index}`, file);
    });

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:5001/upload');

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const copy = { ...uploadProgress };
        files.forEach(file => {
          copy[file.name] = (event.loaded / event.total) * 100;
        });
        setUploadProgress(copy);
      }
    };

    xhr.onload = () => {
      if (xhr.status === 200) {
        alert('Files uploaded successfully');
      } else {
        alert('Failed to upload files');
      }
    };

    xhr.send(formData);
  };

  return (
    <div className="file-upload">
      <h2>Upload your PDF ocuments</h2>
      <DragAndDrop onFilesAdded={handleFilesAdded} uploadProgress={uploadProgress} />
      <form onSubmit={handleSubmit}>
        {/* <button type="submit">Submit</button> */}
      </form>
    </div>
  );
}

export default FileUpload;