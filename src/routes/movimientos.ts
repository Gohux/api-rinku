import express from 'express'
import mysql from 'mysql'
import dbConfig from '../conexion/config';


const connection = mysql.createConnection(dbConfig);
connection.connect();

const router = express.Router()


router.post('/insertar_movimiento', (req, res) => {
    const { fecha, numeroEmpleado, movimientos } = req.body;

    connection.query('CALL InsertarMovimientoEmpleado(?, ?, ?)', [fecha, numeroEmpleado, movimientos], (error, _results) => {
      if (error) {
        console.error('Error al llamar al procedimiento almacenado: ' + error.message);
        res.status(500).json({ error: 'Error al llamar al procedimiento almacenado' });
      } else {
        console.log('Procedimiento almacenado ejecutado exitosamente.');
        res.status(200).json({ message: 'Procedimiento almacenado ejecutado exitosamente' });
      }
    });
  });



  export default router