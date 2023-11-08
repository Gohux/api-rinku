import express from 'express'
import empleadosRouter from './routes/empleados'
import movimientosRouter from './routes/movimientos'

const app = express()
const cors = require('cors');

app.use(express.json())

const PORT = process.env.PORT || 3000

const allowedOrigins = ['http://localhost:4200']; // Agrega el dominio de tu aplicación Angular

app.use(cors({
  origin: function (origin: string, callback: (arg0: Error | null, arg1: boolean | undefined) => void) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'), false);
    }
  },
}));

app.use('/api/empleados', empleadosRouter);
app.use('/api/movimientos', movimientosRouter);

app.listen(PORT, () =>{
    console.log(`Servidor corriendo en puerto ${PORT}`)
});


