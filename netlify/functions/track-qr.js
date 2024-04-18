const mysql = require('mysql');

// MySQL connection details
const connection = mysql.createConnection({
  host: '47.153.42.179',
  user: 'steven',
  password: 'Spiderman57#',
  database: 'qrcode',
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

    console.log('Connected to MySQL database successfully!');

    // Close the database connection
    connection.end();
  });

  // Return a simple response
  return {
    statusCode: 200,
    body: 'Function executed successfully',
  };
};