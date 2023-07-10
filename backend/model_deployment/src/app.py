from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib


app = Flask(__name__)
CORS(app)


# Load the model
model = joblib.load('./../models/model.joblib')
vectorizer = joblib.load('./../models/tfidf_vectorizer.joblib')


@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json(force=True)
    input_data = data['input_data']  
    
    # Convert your text data into a 2D array
    input_data = vectorizer.transform([input_data])  

    predictions = model.predict(input_data)
    print(predictions[0])
    return jsonify(predictions.tolist())

if __name__ == '__main__':
    app.run(debug=True)
