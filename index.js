const express = require('express');

// Crear el servidor
const app = express();

// Rutas
app.get('/', (req, res) => {
  res.send('Hola Mundo');
});

// Definir el puerto y arrancar el servidor
const port = 3001;
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});