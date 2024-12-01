var path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(express.static('dist'))

const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());

console.log(__dirname);

// Variables for url and api key
const API_KEY = process.env.API_KEY;

app.get('/', function (req, res) {
    res.send("This is the server API page, you may access its services via the client app.");
    res.sendFile('dist/index.html')
});


// POST Route

app.post('/analyze', async (req, res) => {
    const { text, lang } = req.body; // Extract text and language from the client request

    if (!text) {
        return res.status(400).json({ error: "Text is required for analysis" });
    }

    // Prepare the payload for the MeaningCloud API
    const payload = new URLSearchParams({
        key: API_KEY,
        txt: text,
        lang: lang || "en" // Default to English if no language is provided
    });

    try {
        // Make the POST request to the MeaningCloud API
        const response = await fetch(MEANINGCLOUD_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: payload.toString(),
        });

        // Parse the JSON response
        const data = await response.json();

        // Send the API response back to the client
        if (data.status.code === "0") {
            res.status(200).json(data);
        } else {
            res.status(400).json({ error: "Error from MeaningCloud API", details: data });
        }
    } catch (error) {
        // Handle any errors during the fetch request
        console.error("Error while calling MeaningCloud API:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


// Designates what port the app will listen to for incoming requests
app.listen(8000, function () {
    console.log('Example app listening on port 8000!');
});


