"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const empleados_1 = __importDefault(require("./routes/empleados"));
const movimientos_1 = __importDefault(require("./routes/movimientos"));
const app = (0, express_1.default)();
const cors = require('cors');
app.use(express_1.default.json());
const PORT = process.env.PORT || 3000;
const allowedOrigins = ['http://localhost:4200']; // Agrega el dominio de tu aplicación Angular
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        }
        else {
            callback(new Error('Not allowed by CORS'), false);
        }
    },
}));
app.use('/api/empleados', empleados_1.default);
app.use('/api/movimientos', movimientos_1.default);
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
