import React, { useState } from 'react';
import FileUpload from '../FileUpload';

function FormPage() {
  const [id1, setId1] = useState('');
  const [id2, setId2] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    alert(`ID1: ${id1}, ID2: ${id2}`);
  };

  return (
    <div className="FormPage">
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
        <FileUpload />
        <button type="submit">Create NFT</button>
      </form>
    </div>
  );
}

export default FormPage;