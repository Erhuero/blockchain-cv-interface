import React, { useState, useEffect } from 'react';
import FileUpload from '../FileUpload';
import './FormPage.css';

const getUserID = () => {
  return "34A8-8F9D-2B3A-4D7A-5CE1";
};

const getUserName = () => {
  return "Nelly Pringent";
};

function FormPage() {
  const [id1, setId1] = useState('');
  const [id2, setId2] = useState('');
  const [files, setFiles] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({});
  const [formVisible, setFormVisible] = useState(true);
  const [successMessageVisible, setSuccessMessageVisible] = useState(false);

  const handleFilesAdded = (newFiles) => {
    setFiles(newFiles);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormVisible(false);
    setSuccessMessageVisible(true);
  };

  return (
    <div className="FormPage">
      {formVisible ? (
        <form onSubmit={handleSubmit}>
          <h1>Welcome {getUserName()}</h1>
          <h3>Your ID : {getUserID()}</h3>
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
      ) : null}
      {successMessageVisible ? (
        <div className="success-message">
          <h1>Success!</h1>
          <p>Your NFT Certificate has been created successfully.</p>
        </div>
      ) : null}
    </div>
  );
}

export default FormPage;