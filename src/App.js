import React from 'react';
import QRCodeComponent from './QRCodeComponent';

import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div>
      <h1>Welcome to the Reservation System</h1>
      {/* Render the QR Code component here */}
      <QRCodeComponent />
    </div>
  );
}

export default App;
