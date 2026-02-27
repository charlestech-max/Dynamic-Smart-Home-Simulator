const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Sample data to mimic a database
let devices = {
    lights: { state: 'off', location: 'Living Room' },
    thermostat: { state: 22, unit: 'Celsius' },
    tv: { state: 'off', channel: 'Netflix' }
};

// Routes
app.get('/api/devices/:deviceName', (req, res) => {
    const deviceName = req.params.deviceName;
    const device = devices[deviceName];
    if (device) {
        res.status(200).json(device);
    } else {
        res.status(404).json({ error: 'Device not found' });
    }
});

app.post('/api/devices/:deviceName', (req, res) => {
    const deviceName = req.params.deviceName;
    const updates = req.body;
    if (devices[deviceName]) {
        devices[deviceName] = { ...devices[deviceName], ...updates };
        res.status(200).json(devices[deviceName]);
    } else {
        res.status(404).json({ error: 'Device not found' });
    }
});

// MongoDB Connection (Replace 'DATABASE_URL' with actual MongoDB URL)
mongoose.connect('mongodb://localhost:27017/smartHome', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));