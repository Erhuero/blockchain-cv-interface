import React, { useState, useEffect } from 'react';
import FileUpload from '../FileUpload';
import './FormPage.css';


// Utility function to generate a random hash code
const getUserID = () => {
    return "34A8-8F9D-2B3A-4D7A-5CE1";
  };

const getUserName = () => {
    return "Nelly Pringent";
};

function FormPage() {
  const [id1, setId1] = useState('');
  const [id2, setId2] = useState('');
  const [userID, setUserID] = useState('');
  const [userName, setUserName] = useState('');
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setUserID(getUserID());
  }, []);

  useEffect(() => {
    setUserName(getUserName());
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
        setSubmitted(true);
      } else {
        alert('Failed to upload files');
      }
    };

    xhr.send(formData);
  };

  return (
    <div className="FormPage">
      {submitted ? (
        <div className="success-message">
          <h1>NFT Created Successfully</h1>
          <p>These files:</p>
          <ul>
            {files.map(file => (
              <li key={file.name}>{file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)</li>
            ))}
          </ul>
          <p>With these IDs:</p>
          <ul>
            <li>ID 1: {id1}</li>
            <li>ID 2: {id2}</li>
          </ul>
          <p>Hash: {userID}</p>
          <p>A signing request has been sent by email to the institute.</p>
        </div>
      ) : (
        <>
          <h1>Welcome {userName}</h1>
          <h3>Your ID : {userID}</h3>
          
          <form onSubmit={handleSubmit}>
          <h2>Issuing Institute Identifier</h2>
            <input
              type="text"
              value={id1}
              onChange={(e) => setId1(e.target.value)}
              placeholder="Enter the ID"
            />
            <h2>Certificate Identifier</h2>
            <input
              type="text"
              value={id2}
              onChange={(e) => setId2(e.target.value)}
              placeholder="Enter the ID"
            />
            <FileUpload onFilesAdded={handleFilesAdded} uploadProgress={uploadProgress} />
            <button type="submit" className="submit-button">Create NFT Certificate</button>
          </form>
        </>
      )}
    </div>
  );
}

export default FormPage;