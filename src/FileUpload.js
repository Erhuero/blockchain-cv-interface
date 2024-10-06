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
    files.forEach((file) => {
      formData.append('file', file);
    });

    try {
      // Appel vers Pinata pour téléverser les fichiers
      const pinataApiKey = 'YOUR_PINATA_API_KEY';
      const pinataSecretApiKey = 'YOUR_PINATA_SECRET_API_KEY';

      const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${pinataApiKey}:${pinataSecretApiKey}`,
        },
      });

      const result = await response.json();
      if (response.status === 200) {
        const ipfsHash = result.IpfsHash;
        console.log('Fichier téléversé avec succès. IPFS Hash:', ipfsHash);

        // Utiliser le hash pour minter un NFT
        mintNFT(ipfsHash);
      } else {
        alert('Échec du téléversement vers Pinata');
      }
    } catch (error) {
      console.error('Erreur lors du téléversement', error);
      alert('Erreur lors du téléversement vers Pinata');
    }
  };

  const mintNFT = async (ipfsHash) => {
    try {
      // Ici, tu peux appeler ton backend ou interagir directement avec le contrat
      // via ethers.js pour minter un NFT avec le hash IPFS

      const tokenURI = `ipfs://${ipfsHash}`;
      const response = await fetch('http://localhost:5001/mint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tokenURI }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('NFT minted successfully', result);
        alert('NFT minted successfully');
      } else {
        alert('Failed to mint NFT');
      }
    } catch (error) {
      console.error('Error minting NFT:', error);
    }
  };

  return (
    <div className="file-upload">
      <h2>Upload PDF of your Certificate</h2>
      <DragAndDrop onFilesAdded={handleFilesAdded} uploadProgress={uploadProgress} />
      <form onSubmit={handleSubmit}>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default FileUpload;
