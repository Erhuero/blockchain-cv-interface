import React, { useState, useEffect } from 'react';
import FileUpload from '../FileUpload';
import './FormPage.css';

// Utility function to generate a random hash code
const generateRandomHash = () => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

function FormPage() {
  const [id1, setId1] = useState('');
  const [id2, setId2] = useState('');
  const [hashCode, setHashCode] = useState('');
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});

  useEffect(() => {
    setHashCode(generateRandomHash());
  }, []);

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
    <div className="FormPage">
      <h1>Welcome Nelly Pringent</h1>
      <h3>Your profile ID: {hashCode}</h3>
      <h2>Enter IDs and Upload Files</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={id1}
          onChange={(e) => setId1(e.target.value)}
          placeholder="Enter ID 1"
        />
        <input
          type="text"
          value={id2}
          onChange={(e) => setId2(e.target.value)}
          placeholder="Enter ID 2"
        />
        <FileUpload onFilesAdded={handleFilesAdded} uploadProgress={uploadProgress} />
        <button type="submit" className="submit-button">Create NFT</button>
      </form>
    </div>
  );
}

export default FormPage;