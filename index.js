import express from 'express';
import usuarioRoutes from './routes/usuarioRoutes.js'
import db from './config/db.js'

// Crear la app
const app = express();


try {
    await db.authenticate();
    console.log('conexion correcta');
} catch (error) {
    console.log(error);
}

// Habilitar Pug
app.set('view engine', 'pug')
app.set('views', './views')

// Carpeta Pública
app.use(express.static('public'))

// Routing
app.use('/auth', usuarioRoutes);

// Definir un puerto y arrancar el proyecto
const port = 3000;
app.listen(port, () => {
    console.log(`El servidor esta funcionando en el puerto ${port}`);
});