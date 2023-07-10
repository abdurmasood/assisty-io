import React, { useState } from 'react';
import axios from 'axios';
import './SpamClassifier.css';
import messages from './messages.json';  // Import your messages

function SpamClassifier() {
    const [text, setText] = useState('');
    const [prediction, setPrediction] = useState(null);
    const url = "https://abdurmasood.pythonanywhere.com/predict"
    // uncomment for local
    // const url = 'http://127.0.0.1:5000/predict' 

    const handleChange = event => {
        setText(event.target.value);
    };

    const handleSubmit = async event => {
        event.preventDefault();
        try {
            const response = await axios.post(url, { input_data: text });
            setPrediction(response.data[0]);
        } catch (error) {
            console.error(error);
        }
    };

    // Function to generate a random message
    const generateRandomMessage = () => {
        const type = Math.random() < 0.5 ? "spam" : "ham";
        const randomIndex = Math.floor(Math.random() * messages[type].length);
        const randomMessage = messages[type][randomIndex];
        setText(randomMessage);
    };

    return (
        <div className="spam-classifier">
            <h1 className="spam-classifier-title">Spam Classifier Demo</h1>
            <form onSubmit={handleSubmit} className="spam-classifier-form">
                <textarea value={text} onChange={handleChange} className="spam-classifier-input" />
                <button type="button" onClick={generateRandomMessage} className="spam-classifier-generate">Generate Random Message</button>
                <button type="submit" className="spam-classifier-submit">Classify</button>
            </form>
            {prediction !== null && (
                <div className={`spam-classifier-output ${prediction === 1 ? 'spam' : 'ham'}`}>
                    {prediction === 1 ? 'Spam' : 'Ham'}
                </div>
            )}
        </div>
    );
}

export default SpamClassifier;
