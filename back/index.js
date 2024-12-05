import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config(); // Carga las variables de entorno desde .env

const PORT = process.env.PORT || 3000;

// Configuración del servidor
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*', // Cambiar según el dominio permitido
        methods: ['GET', 'POST'],
    },
});

// Middleware
app.use(cors()); // Habilita CORS
app.use(express.json()); // Permite recibir y trabajar con JSON

// Rutas básicas
app.get('/', (req, res) => {
    res.json({ message: 'Servidor funcionando correctamente' });
});

// Socket.IO
io.on('connection', (socket) => {
    console.log(`Usuario conectado: ${socket.id}`);

    // Escuchar eventos
    socket.on('mensaje', (data) => {
        console.log(`Mensaje recibido: ${data}`);
        // Enviar una respuesta a todos los clientes conectados
        io.emit('respuesta', `Servidor recibió: ${data}`);
    });

    socket.on('disconnect', () => {
        console.log(`Usuario desconectado: ${socket.id}`);
    });
});

// Iniciar servidor
server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});