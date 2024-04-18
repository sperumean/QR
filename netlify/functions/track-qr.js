const mysql = require('mysql2');

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
  const timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
  const requestId = generateRandomString(8);

  console.log('Connecting to MySQL database...');

  try {
    // Connect to the MySQL database
    await new Promise((resolve, reject) => {
      connection.connect((err) => {
        if (err) {
          console.error('Error connecting to MySQL database:', err);
          reject(err);
        } else {
          console.log('Connected to MySQL database successfully.');
          resolve();
        }
      });
    });

    console.log('Inserting scan record...');

    // Insert a new record into the qr_scans table
    await new Promise((resolve, reject) => {
      connection.query(
        'INSERT INTO qr_scans (timestamp, request_id) VALUES (?, ?)',
        [timestamp, requestId],
        (error, results) => {
          if (error) {
            console.error('Error inserting scan log:', error);
            reject(error);
          } else {
            console.log('QR Code scanned at:', timestamp, 'Request ID:', requestId);
            console.log('Scan record inserted successfully.');
            resolve();
          }
        }
      );
    });

    // Close the database connection
    connection.end();

    // Redirect scanners to a different site
    return {
      statusCode: 301,
      headers: {
        Location: 'https://www.calbaptist.edu',
      },
    };
  } catch (error) {
    console.error('Error occurred:', error);
    return {
      statusCode: 500,
      body: 'Internal Server Error',
    };
  }
};