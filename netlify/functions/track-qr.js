const mysql = require('mysql');

// MySQL connection details
const connection = mysql.createConnection({
  host: '47.153.42.179',
  user: 'steven',
  password: 'Spiderman57#',
  database: 'qrcode'
  connectTimeout: 60000, // Increase the timeout to 60 seconds (60000 ms)

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
  const requestId = generateRandomString(8);

  console.log('Connecting to MySQL database...');

  // Connect to the MySQL database
  connection.connect((err) => {
    if (err) {
      console.error('Error connecting to MySQL database:', err);
      // Optionally, you can return an error response here
      return {
        statusCode: 500,
        body: 'Error connecting to MySQL database',
      };
    }

    console.log('Connected to MySQL database. Inserting scan record...');

    // Insert a new record into the qr_scans table
    connection.query(
      'INSERT INTO qr_scans (timestamp, request_id) VALUES (?, ?)',
      [timestamp, requestId],
      (error, results) => {
        if (error) {
          console.error('Error inserting scan log:', error);
        } else {
          console.log('Scan record inserted successfully');
          console.log('QR Code scanned at:', timestamp, 'Request ID:', requestId);
        }

        // Close the database connection
        connection.end();
      }
    );
  });

  // Redirect scanners to a different site
  return {
    statusCode: 301,
    headers: {
      Location: 'https://www.calbaptist.edu',
    },
  };
};