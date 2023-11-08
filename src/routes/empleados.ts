import express from 'express'
import mysql from 'mysql'
import dbConfig from '../conexion/config';


const connection = mysql.createConnection(dbConfig);
connection.connect();

const router = express.Router()


router.post('/insertar_empleado', (req, res) => {
    const { nombre, numeroEmpleado, rol } = req.body;

    connection.query('CALL InsertarEmpleado(?, ?, ?)', [nombre, numeroEmpleado, rol], (error, _results) => {
      if (error) {
        console.error('Error al llamar al procedimiento almacenado: ' + error.message);
        res.status(500).json({ error: 'Error al llamar al procedimiento almacenado' });
      } else {
        console.log('Procedimiento almacenado ejecutado exitosamente.');
        res.status(200).json({ message: 'Procedimiento almacenado ejecutado exitosamente' });
      }
    });
  });

  router.post('/obtener_nomina', (req, res) => {
    const {numeroEmpleado, fecha } = req.body;
    connection.query('CALL CalcularNominaPorEmpleado(?, ?)', [numeroEmpleado, fecha], (error, results) => {
      if (error) {
        console.error('Error al llamar al procedimiento almacenado: ' + error.message);
        res.status(500).json({ error: 'Error al llamar al procedimiento almacenado' });
      } else {
        console.log('Procedimiento almacenado ejecutado exitosamente.');
        res.status(200).json({ results });
      }
    });
  });

  router.get('/obtener_empleados', (_req, res) => {

    connection.query('CALL ObtenerEmpleados()', (error, results) => {
      if (error) {
        console.error('Error al llamar al procedimiento almacenado: ' + error.message);
        res.status(500).json({ error: 'Error al llamar al procedimiento almacenado' });
      } else {
        console.log('Procedimiento almacenado ejecutado exitosamente.');
        res.status(200).json({ results });
      }
    });
  });



  export default router

