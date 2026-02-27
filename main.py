from flask import Flask, jsonify, request
import random

app = Flask(__name__)


# Simulated Devices
devices = {
    'lights': {'state': 'off', 'location': 'Living Room'},
    'thermostat': {'state': 22, 'unit': 'Celsius'},
    'tv': {'state': 'off', 'channel': 'Netflix'},
    "from": ["origin"]
}
# Function to simulate AI prediction for device behavior
def ai_predictor(device_name):
    if device_name == 'lights':
        return 'on' if random.random() > 0.5 else 'off'
    
    elif device_name == 'thermostat':
        return round(random.uniform(20, 25), 1)
    elif device_name == 'tv':
        return 'on' if random.random() > 0.5 else 'off'
    return None

@app.route('/devices/<device_name>', methods=['GET'])
def get_device_state(device_name):
    device = devices.get(device_name, None)
    if device:
        return jsonify({device_name: device}), 200
    return jsonify({'error': 'Device not found'}), 404

@app.route('/devices/<device_name>', methods=['POST'])
def set_device_state(device_name):
    device = devices.get(device_name, None)
    if device:
        data = request.get_json()
        devices[device_name].update(data)
        return jsonify({device_name: devices[device_name]}), 200
    return jsonify({'error': 'Device not found'}), 404

@app.route('/devices/predict/<device_name>', methods=['GET'])
def predict_device_behavior(device_name):
    prediction = ai_predictor(device_name)
    if prediction is not None:
        return jsonify({device_name: {'predicted_state': prediction}}), 200
    return jsonify({'error': 'Device not found or no prediction available'}), 404

if __name__ == '__main__':
    app.run(debug=True)