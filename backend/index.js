require('dotenv').config();  // Charger les variables d'environnement depuis .env

const express = require('express');
const cors = require('cors');
const multer = require('multer');
const crypto = require('crypto');
const fs = require('fs');
const { ethers } = require('ethers');  // Importer ethers pour interagir avec le smart contract
const app = express();

app.use(cors());
const upload = multer({ dest: 'uploads/' });

// Charger les variables d'environnement
const pinataApiKey = process.env.PINATA_API_KEY;
const pinataSecretApiKey = process.env.PINATA_SECRET_API_KEY;
const privateKey = process.env.PRIVATE_KEY;  // Clé privée pour signer les transactions
const contractAddress = process.env.CONTRACT_ADDRESS;  // Adresse du contrat déployé

// Configuration d'Ethers.js pour Avalanche Fuji
const provider = new ethers.providers.JsonRpcProvider('https://api.avax-test.network/ext/bc/C/rpc');
const wallet = new ethers.Wallet(privateKey, provider);

const contractABI = [
  // ABI de ton contrat déployé
];

// Instance du contrat
const contract = new ethers.Contract(contractAddress, contractABI, wallet);

// Route pour téléverser un fichier, calculer le hash et mint un NFT
app.post('/upload', upload.single('file'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send({ message: 'No file uploaded.' });
  }

  // Lire le fichier téléversé et créer un hash SHA-256
  const fileBuffer = fs.readFileSync(req.file.path);
  const hashSum = crypto.createHash('sha256');
  hashSum.update(fileBuffer);
  const hexHash = hashSum.digest('hex');

  try {
    // Mint un NFT avec le hash comme tokenURI
    const transaction = await contract.mint(wallet.address, hexHash);
    await transaction.wait();  // Attends la confirmation de la transaction
    res.send({ message: 'NFT minted successfully', transactionHash: transaction.hash });
  } catch (error) {
    console.error("Error minting NFT:", error);
    res.status(500).send({ message: 'Error minting NFT', error: error.toString() });
  }
});

const port = 5001;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
