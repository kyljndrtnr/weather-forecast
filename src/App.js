import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import WeatherForm from './components/WeatherForm';
import WeatherDisplay from './components/WeatherDisplay';
import axios from 'axios';

const App = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const getWeather = async (city) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('http://localhost:5000/weather', {
                params: { city }
            });
            setWeatherData(response.data);
        } catch (error) {
            setError('Error fetching weather data');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <h1 className="my-4">Weather Forecast</h1>
            <WeatherForm getWeather={getWeather} />
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {weatherData && <WeatherDisplay data={weatherData} />}
        </div>
    );
};

export default App;
