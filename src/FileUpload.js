import React, { useState } from 'react';

function FileUpload() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Please upload a file first!");
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    // Soumission vers le backend
    const response = await fetch('http://localhost:5000/upload', {
      method: 'POST',
      body: formData
    });

    const result = await response.json();
    alert(result.message);
  };

  return (
    <div>
      <h2>Upload a PDF Document</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" accept=".pdf" onChange={handleFileChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default FileUpload;
