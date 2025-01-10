import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs'; // Encriptación de contraseñas
import jwt from 'jsonwebtoken'; // secret-key
import communicationManager from './communicationManager.js';
import { MongoClient } from 'mongodb';
import getRandomQuestion from './generateQuestionFunctions.js'; // getRandomQuestion()

dotenv.config(); // Carga las variables de entorno de .env

const PORT = process.env.PORT || 3000;

// Configuración del servidor
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});

// Middleware
app.use(cors()); // Habilita CORS
app.use(express.json()); // Permite recibir y trabajar con JSON

const mongoUri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(mongoUri);

async function getClientDB() {
    try {
        await client.connect();
        console.log("Conexión exitosa a MongoDB Atlas");
        return client;
    } catch (error) {
        console.error("Error al conectar:", error);
    }
}

const connectDB = async () => {
    try {
        const client = await getClientDB();

        // Usa la base de datos especificada
        const database = client.db(process.env.MONGO_DB);
        const collection = database.collection('statistics');

        // Ejemplo: Insertar datos
        const result = await collection.insertOne({ mensaje: "Conexión exitosa usando variables de entorno" });
        console.log("Documento insertado con ID:", result.insertedId);
    } catch (error) {
        console.error("Error al conectar:", error);
    } finally {
        await client.close();
    }
};

const getStatistics = async (query) => {
    try {
        const client = await getClientDB();

        // Usa la base de datos especificada
        const database = client.db(process.env.MONGO_DB);
        const collection = database.collection('statistics');

        // Realizar la consulta
        const results = await collection.find(query).toArray();

        console.log("Resultados obtenidos:", results.length);
        return results;
    } catch (error) {
        console.error("Error al obtener datos:", error);
        throw error;
    } finally {
        await client.close();
    }
};

app.get('/getStats', async (req, res) => {
    const query = { "date.year": 2025 };

    try {
        const stats = await getStats(query); // Usa directamente await
        res.json(stats); // Enviar la respuesta como JSON
    } catch (error) {
        console.error("Error al obtener estadísticas:", error);
        res.status(500).json({ error: "Error al obtener estadísticas" });
    }
});


// Rutas básicas
app.get('/', (req, res) => {
    res.json({ message: 'Servidor funcionando correctamente' });
});

// Rutas básicas
app.get('/', (req, res) => {
    res.json({ message: 'Servidor funcionando correctamente' });
});

function verifyToken(secrets) {
    return (req, res, next) => {
        const token = req.headers['authorization']?.split(' ')[1]; // Leer el token del encabezado "Authorization"

        if (!token) {
            return res.status(401).json({ message: 'Token no proporcionado' });
        }

        for (const secret of secrets) {
            try {
                const decoded = jwt.verify(token, secret); // Intentar verificar el token
                req.user = decoded; // Agregar los datos del usuario decodificado al objeto de solicitud
                return next(); // Token válido
            } catch (error) {
                // Continuar intentando con otros secretos
            }
        }

        return res.status(403).json({ message: 'Token inválido o expirado' }); // Ningún secreto válido
    };
}
const verifyTokenAdmin = verifyToken([process.env.JWT_SECRET_ADMIN]);
const verifyTokenTeacher = verifyToken([process.env.JWT_SECRET_ADMIN, process.env.JWT_SECRET_TEACHER]);
const verifyTokenStudent = verifyToken([process.env.JWT_SECRET_ADMIN, process.env.JWT_SECRET_TEACHER, process.env.JWT_SECRET_STUDENT]);

// Ruta protegida de ejemplo
app.get('/protected', verifyToken, (req, res) => {
    res.json({ message: `Bienvenido, ${JSON.stringify(req.body)}` });
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

    socket.on('bandera-verde-obtenida', (userName) => {
        io.emit('bandera-verde-obtenida', userName);
    });
    socket.on('bandera-roja-obtenida', (userName) => {
        io.emit('bandera-roja-obtenida', userName);
    });
});

// Login de usuarios
app.post('/auth/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Se requieren usuario y contraseña' });
    }

    try {
        // Buscar el usuario en la base de datos a través del communicationManager
        const user = await communicationManager.findUserByMail(email);

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Verificar la contraseña
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        const permission = await communicationManager.getPermissionById(user.permission_type_id);

        let token;

        // Generar el token JWT
        switch (permission.id) {
            case 1:
                console.log('Usuario admin');
                token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET_ADMIN, { expiresIn: '24h' });
                break;
            case 2:
                console.log('Usuario profesor');
                token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET_TEACHER, { expiresIn: '24h' });
                break;
            case 3:
                console.log('Usuario alumno');
                token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET_STUDENT, { expiresIn: '24h' });
                break;
            default:
                console.log('Usuario sin permisos');
                break;
        }


        res.json({
            message: 'Login exitoso',
            userInfo: {
                username: user.username,
                email: user.email
            },
            token,
            permission: permission.name
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al iniciar sesión' });
    }
});

// Registro de usuarios
app.post('/auth/register', async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Se requieren usuario, email y contraseña' });
    }

    try {
        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // permission
        const permission_type_id = 3

        // Guardar el usuario en la base de datos a través del communicationManager
        await communicationManager.registerUser(username, email, hashedPassword, permission_type_id);

        res.status(201).json({ message: 'Usuario registrado exitosamente' });

        const updatedUsers = await communicationManager.getUsers();
        io.emit('updateUsers', updatedUsers);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al registrar usuario' });
    }
});

// Ruta para obener los usuarios
app.get('/user', verifyTokenAdmin, async (req, res) => {
    try {
        const users = await communicationManager.getUsers()
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los grupos' });
    }
});

// admin modifica el permiso de un usuario
app.post('/modify-permission', verifyTokenAdmin, async (req, res) => {

    const { user_id, permission_type_id } = req.body;

    if (!user_id || !permission_type_id) {
        return res.status(400).json({ message: 'Se requieren usuario y permiso' });
    }

    try {
        // Buscar el usuario en la base de datos a través del communicationManager
        const user = await communicationManager.getUserById(user_id);

        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Modificar el permiso
        await communicationManager.modifyPermission(user_id, permission_type_id);

        res.status(201).json({ message: 'Permiso modificado exitosamente' });

        const updatedUsers = await communicationManager.getUsers();
        io.emit('updateUsers', updatedUsers);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al modificar permiso' });
    }

});

// Ruta per crear un grup y/o asignarse a ell
app.post('/group', verifyTokenTeacher, async (req, res) => {
    const { groupName, autoJoin } = req.body;

    if (!groupName) {
        return res.status(400).json({ message: 'Se requiere un grupo' });
    }

    try {

        // Buscar si el grupo ya existe
        const group = await communicationManager.findGroupByName(groupName);

        // Guardar el grupo en la base de datos a través del communicationManager
        if (!group) await communicationManager.registerGroup(groupName);

        if (autoJoin) {
            // Asignar el grupo al usuario
            await communicationManager.assignGroupToUser(
                req.user.id,
                group.id);
        }

        res.status(201).json({ message: 'Grupo registrado exitosamente' });

        const updatedGroups = await communicationManager.getAllGroups();
        io.emit('updateGroups', updatedGroups);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al registrar grupo' });
    }
});

app.get('/group', verifyTokenTeacher, async (req, res) => {
    try {
        const groups = await communicationManager.getAllGroups()
        res.json(groups);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los grupos' });
    }
});

app.get('/group/assigned', verifyTokenTeacher, async (req, res) => {
    try {
        const groups = await communicationManager.getGroupsFromTeacher(req.user.id)
        res.json(groups);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los grupos' });
    }
});

app.get('/question', async (req, res) => {
    const question = getRandomQuestion();
    res.status(200).json({...question});
});

let code = {};

app.get('/create-code', verifyTokenTeacher, async (req, res) => {
    // Generar un código aleatorio de 6 caracteres
    const newCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    code = newCode;

    res.status(200).json({ code });
});

app.post('/get-code', async (req, res) => {
    res.status(200).json({ code });
});

// Iniciar servidor
server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});