import express from 'express';
import UserRoutes from './routes/user.routes.js';

// Crear el servidor
const app = express();

// Habilitar PUG
app.set('view engine', 'pug');
app.set('views', './src/views');

// Rutas
app.use('/auth', UserRoutes);

// Definir el puerto y arrancar el servidor
const port = 3001;
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
