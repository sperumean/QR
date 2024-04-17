const mysql = require('mysql');

// MySQL connection details
const connection = mysql.createConnection({
  host: '47.153.42.179',
  user: 'steven',
  password: 'Spiderman57#',
  database: 'qrcode'
});

function generateRandomString(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

exports.handler = async (event) => {
  const timestamp = new Date().toISOString();
  const requestId = generateRandomString(8); // Generate a random 8-character string

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

  // Redirect scanners to a different site
  return {
    statusCode: 301,
    headers: {
      Location: 'https://calbaptist.edu/', // Replace with the desired redirect URL
    },
  };
};