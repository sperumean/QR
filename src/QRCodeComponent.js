import React from 'react';
import QRCode from 'qrcode.react';

const QRCodeComponent = () => {
  const netlifyFunctionPath = '/.netlify/functions/track-qr';
  const netlifyDomain = 'https://cbuevents.netlify.app';
  const trackQRUrl = netlifyDomain + netlifyFunctionPath;

  return (
    <div>
      <QRCode
        value={trackQRUrl}
        size={256}
        bgColor="#ffffff"
        fgColor="#000000"
        level="L"
        includeMargin={false}
        renderAs="svg"
      />
    </div>
  );
};

export default QRCodeComponent;