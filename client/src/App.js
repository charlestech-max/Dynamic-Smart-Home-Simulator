import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = (param) => {
    const [devices, setDevices] = useState({});

    useEffect(() => {
        fetchDevices();
    }, []);

    const fetchDevices = async () => {
        try {
            const response = await axios.get('/api/devices');
            setDevices(response.data);
        } catch (error) {
            console.error('Error fetching devices', error);
        }
    };


    const handleToggleDevice = async (deviceName) => {
        const currentDevice = devices[deviceName];
        const newState = currentDevice.state === 'on' ? 'off' : 'on';
        try {
            await axios.post(`/api/devices/${deviceName}`, { state: newState });
            setDevices((prevDevices) => ({
                ...prevDevices,
                [deviceName]: { ...currentDevice, state: newState },
            }));
        } catch (error) {
            console.error('Error toggling device state', error);
        }
    };

    return (
        <div className="App">
            <h1>Smart Home Simulator</h1>
            <div>
                {Object.keys(devices).map((deviceName) => (
                    <div key={deviceName}>
                        <h3>{deviceName}</h3>
                        <p>State: {devices[deviceName].state}</p>
                        <button onClick={() => handleToggleDevice(deviceName)}>
                            Toggle
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default App;