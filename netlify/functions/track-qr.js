const mysql = require('mysql');

// MySQL connection details
const connection = mysql.createConnection({
  host: '47.153.42.179', // Replace with your MySQL host
  user: 'steven', // Replace with your MySQL username
  password: 'Spiderman57#', // Replace with your MySQL password
  database: 'qrcode' // Replace with your MySQL database name
});

exports.handler = async () => {
  const timestamp = new Date().toISOString();
  const requestId = crypto.randomBytes(8).toString('hex');

  // Connect to the MySQL database
  connection.connect();

  // Insert a new record into the qr_scans table
  connection.query(
    'INSERT INTO qr_scans (timestamp, request_id) VALUES (?, ?)',
    [timestamp, requestId],
    (error, results) => {
      if (error) {
        console.error('Error inserting scan log:', error);
      } else {
        console.log('QR Code scanned at:', timestamp, 'Request ID:', requestId);
      }
    }
  );

  // Close the database connection
  connection.end();

  // Optional: Return a response to redirect scanners
  return {
    statusCode: 301,
    headers: {
      Location: 'https://cbureservation.netlify.app', // Redirect scanners to your site
    },
  };
};