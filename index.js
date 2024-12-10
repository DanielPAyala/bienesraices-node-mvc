import express from 'express';
import UserRoutes from './routes/user.routes.js';

// Crear el servidor
const app = express();

// Rutas
app.use('/', UserRoutes);

// Definir el puerto y arrancar el servidor
const port = 3001;
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
