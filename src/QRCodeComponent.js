import React from 'react';
import QRCode from 'qrcode.react';

const QRCodeComponent = () => {
  const trackQRUrl = '/.netlify/functions/track-qr';

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