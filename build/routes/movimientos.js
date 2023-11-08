"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mysql_1 = __importDefault(require("mysql"));
const config_1 = __importDefault(require("../conexion/config"));
const connection = mysql_1.default.createConnection(config_1.default);
connection.connect();
const router = express_1.default.Router();
router.post('/insertar_movimiento', (req, res) => {
    const { fecha, numeroEmpleado, movimientos } = req.body;
    connection.query('CALL InsertarMovimientoEmpleado(?, ?, ?)', [fecha, numeroEmpleado, movimientos], (error, _results) => {
        if (error) {
            console.error('Error al llamar al procedimiento almacenado: ' + error.message);
            res.status(500).json({ error: 'Error al llamar al procedimiento almacenado' });
        }
        else {
            console.log('Procedimiento almacenado ejecutado exitosamente.');
            res.status(200).json({ message: 'Procedimiento almacenado ejecutado exitosamente' });
        }
    });
});
exports.default = router;
