import express from 'express';
import UserRoutes from './routes/user.routes.js';
import db from './config/db.js';

// Crear el servidor
const app = express();

// Habilitar leer los datos del formulario
app.use(express.urlencoded({ extended: true }));

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
app.use('/auth', UserRoutes);

// Definir el puerto y arrancar el servidor
const port = process.env.PORT || process.env.SERVER_PORT;
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
