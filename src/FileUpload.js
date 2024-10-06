import React, { useState } from 'react';

function FileUpload() {
  const [files, setFiles] = useState([]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length > 5) {
      alert('You can only upload up to 5 files');
      return;
    }
    setFiles(selectedFiles);
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

    // Submit to the backend
    const response = await fetch('http://localhost:5001/upload', {
      method: 'POST',
      body: formData
    });

    const result = await response.json();
    alert(result.message);
  };

  return (
    <div>
      <h2>Upload PDF Documents</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" accept=".pdf" multiple onChange={handleFileChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default FileUpload;