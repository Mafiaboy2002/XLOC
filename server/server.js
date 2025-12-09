// server.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const upload = multer({ dest: uploadsDir });
const app = express();
app.use(cors()); // enable if client served from different origin

// Serve static files from public directory
const publicDir = path.join(__dirname, '..', 'public');
app.use(express.static(publicDir));

// Serve location.html as the root
app.get('/', (req, res) => {
  res.sendFile(path.join(publicDir, 'location.html'));
});

app.post('/upload', upload.single('photo'), (req, res) => {
  try {
    const file = req.file; // snapshot saved to uploads/
    const meta = req.body.meta ? JSON.parse(req.body.meta) : null;

    console.log('Received upload:', { file: file && file.filename, meta });

    // Optionally move/rename the file
    const targetPath = path.join(__dirname, 'uploads', file.originalname || (file.filename + '.jpg'));
    // fs.renameSync(file.path, targetPath); // uncomment to rename

    // Save meta as JSON
    const metaFile = path.join(__dirname, 'uploads', (file.filename || 'unknown') + '.json');
    fs.writeFileSync(metaFile, JSON.stringify({ meta, receivedAt: new Date().toISOString() }, null, 2));

    res.json({ status: 'ok', message: 'Uploaded successfully', file: file.originalname || file.filename });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: err.message });
  }
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server listening on port ${PORT}`));
