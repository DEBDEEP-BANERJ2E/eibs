const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = 5177;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Route to handle the POST request to update the JSON file
app.post('/', (req, res) => {
    const card = req.body.card;
    const filePath = path.join(__dirname, 'cards.json');

    // Read the existing JSON file (or create if it doesn't exist)
    fs.readFile(filePath, 'utf8', (err, data) => {
        let cards = [];
        if (err) {
            // If file doesn't exist, start with an empty array
            if (err.code === 'ENOENT') {
                cards = [];
            } else {
                console.error('Error reading file:', err);
                return res.status(500).send('Server error');
            }
        } else {
            cards = JSON.parse(data);
        }

        // Add the new card to the array or modify existing cards
        cards.push(card);

        // Save the updated array back to the JSON file
        fs.writeFile(filePath, JSON.stringify(cards, null, 2), (err) => {
            if (err) {
                console.error('Error writing to file:', err);
                return res.status(500).send('Server error');
            }
            console.log('Card details successfully saved');
            return res.status(200).send('Card details saved successfully');
        });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
