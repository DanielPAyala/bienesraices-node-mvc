import express from 'express';
import csrf from 'csurf';
import cookieParser from 'cookie-parser';
import AppRoutes from './routes/app.routes.js';
import UserRoutes from './routes/user.routes.js';
import PropertyRoutes from './routes/property.routes.js';
import ApiRoutes from './routes/api.routes.js';
import db from './config/db.js';

// Crear el servidor
const app = express();

// Habilitar leer los datos del formulario
app.use(express.urlencoded({ extended: true }));

// Habilitar cookie-parser
app.use(cookieParser());

// Habilitar CSRF
app.use(csrf({ cookie: true }));

// Conectar a la base de datos
try {
  await db.authenticate();
  db.sync();
  console.log('Conexión a la base de datos exitosa');
} catch (error) {
  console.error('No se pudo conectar a la base de datos:', error);
}

// Habilitar PUG
app.set('view engine', 'pug');
app.set('views', './src/views');

// Carpeta publica
app.use(express.static('public'));

// Rutas
app.use('/', AppRoutes);
app.use('/auth', UserRoutes);
app.use('/', PropertyRoutes);
app.use('/api', ApiRoutes);

// Definir el puerto y arrancar el servidor
const port = process.env.PORT || process.env.SERVER_PORT;
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
