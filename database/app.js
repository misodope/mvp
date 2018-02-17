const mysql = require('mysql');

let connection = mysql.createConnection({
  host: 'us-cdbr-iron-east-05.cleardb.net',
  user: 'b8d60d9b083b11',
  password: '9bfcd5ec',
  database: 'heroku_3a1dd421541387b'
});

connection.connect((error) => {
  if (error) {
    console.log('There\'s an error', error);
  }
  console.log('Database successfully connected');
});

// let myDatabase = `CREATE DATABASE IF NOT EXISTS mvp_db`;

let users = `CREATE TABLE IF NOT EXISTS users (
  id INT NOT NULL AUTO_INCREMENT,
  username VARCHAR(30) NOT NULL,
  password VARCHAR(30) NOT NULL,
  PRIMARY KEY (id),
  UNIQUE(username)
)`;

let images = `CREATE TABLE IF NOT EXISTS images (
  id INT NOT NULL AUTO_INCREMENT,
  filename VARCHAR(255) NOT NULL,
  path VARCHAR(5000) NOT NULL,
  tag VARCHAR(255) NOT NULL,
  user_id INT,
  PRIMARY KEY(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
)`;

// connection.query(myDatabase, (error) => {
//   if (error) {
//     console.log(error);
//   }
//   connection.query('USE mvp_db', (error) => {
//     if (error) {
//       console.log(error);
//     }
//   })
// })

connection.query(users, (error) => {
  if (error) {
    console.log("There was an error creating the table", error);
  }
});

connection.query(images, (error) => {
  if (error) {
    console.log("There was an error creating the table", error);
  }
});

module.exports = connection;
