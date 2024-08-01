const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;
const API_KEY = process.env.ACCUWEATHER_API_KEY;

app.use(cors());

app.get('/weather', async (req, res) => {
    const { city } = req.query;
    if (!city) {
        return res.status(400).json({ error: 'City is required' });
    }

    try {
        // First, get the location key for the city
        const locationResponse = await axios.get(`http://dataservice.accuweather.com/locations/v1/cities/search`, {
            params: {
                apikey: API_KEY,
                q: city
            }
        });

        const locationKey = locationResponse.data[0].Key;

        // Then, get the weather data using the location key
        const weatherResponse = await axios.get(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}`, {
            params: {
                apikey: API_KEY,
                metric: true
            }
        });

        res.json(weatherResponse.data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching weather data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
