from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Load the model
model = joblib.load('random_forest_model.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    features = np.array([[ 
        data['Age'],            # 'Age'
        data['numConceived'],    # 'G' (Gravida)
        data['deliveries'],      # 'P' (Parity)
        data['liveBirth'],       # 'L' (Live Births)
        data['abortion'],        # 'A' (Abortions)
        data['childDeath'],      # 'D' (Child Death)
        data['SystolicBP'],      # 'SystolicBP'
        data['DiastolicBP'],     # 'DiastolicBP'
        data['RBS'],             # 'RBS'
        data['BodyTemp'],        # 'BodyTemp'
        data['HeartRate'],       # 'HeartRate'
        data['HB'],              # 'HB'
        data['HBA1C'],           # 'HBA1C'
        data['RR']               # 'RR'
    ]])
    prediction = model.predict(features)
    return jsonify({'risk': int(prediction[0])})

if __name__ == '__main__':
    app.run(debug=True)
