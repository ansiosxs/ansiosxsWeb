const mysql = require('mysql');
const dbConfig = require('./config-db');

const pool = mysql.createPool(dbConfig);

pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error de conexión:', err.message);
  } else {
    console.log('¡Conexión exitosa a la base de datos!');
    connection.release();
  }
  pool.end();
});