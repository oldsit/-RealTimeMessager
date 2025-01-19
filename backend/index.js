const express = require('express');
const { Storage } = require('@google-cloud/storage');
const path = require('path');

const app = express();
app.use(express.json()); // Enable parsing JSON in request body

// Initialize GCP Storage
const storage = new Storage({
  keyFilename: path.join(__dirname, 'mushiokey.json'), // Ensure your service account file is correctly placed
});

const bucketName = 'rtmbucket';

// Combined Endpoint: Create "images" and "pfp" folders
app.post('/create-user-folders', async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: 'Missing userId in request body' });
  }

  try {
    const folders = [
      `images/${userId}/.empty`, // "images" folder
      `pfp/${userId}/.empty`,   // "pfp" folder
    ];

    // Create placeholder files to simulate folders
    await Promise.all(
      folders.map((folder) =>
        storage.bucket(bucketName).file(folder).save('', {
          contentType: 'application/json', // Placeholder file mimics a folder
        })
      )
    );

    res.status(200).json({ message: 'Folders created successfully' });
  } catch (error) {
    console.error('Error creating folders:', error);
    res.status(500).json({ error: 'Error creating folders' });
  }
});

// Start Express Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
