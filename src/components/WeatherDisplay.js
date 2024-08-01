import React from 'react';

const WeatherDisplay = ({ data }) => {
    return (
        <div>
            <h2>Weather Forecast for {data.Headline.Text}</h2>
            <div className="row">
                {data.DailyForecasts.map((weather, index) => (
                    <div key={index} className="col-md-4">
                        <div className="card mb-4">
                            <div className="card-body">
                                <h5 className="card-title">{new Date(weather.Date).toLocaleDateString()}</h5>
                                <p className="card-text">
                                    <strong>Temperature:</strong> {weather.Temperature.Minimum.Value}°C - {weather.Temperature.Maximum.Value}°C<br />
                                    <strong>Weather:</strong> {weather.Day.IconPhrase}<br />
                                    <strong>Night:</strong> {weather.Night.IconPhrase}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default WeatherDisplay;
