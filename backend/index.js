const express = require('express');
const cors = require('cors');
const multer = require('multer');
const app = express();

app.use(cors());
const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send({ message: 'No file uploaded.' });
  }
  // Ici, tu pourrais également ajouter le hachage du fichier avant de l'envoyer à la blockchain
  res.send({ message: 'File uploaded successfully.', file: req.file });
});

const port = 5001;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
