import express from "express";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import db from "./config/db.js";
import cookieParser from "cookie-parser";
import csrf from "csurf";

// Crear la app
const app = express();

// Habilitar lectura de datos de formularios
app.use(express.urlencoded({ extended: true }));

// Habilitar Cokie Parser
app.use(cookieParser());

// Habilitar CSFR
app.use(csrf({ cookie: true }));

// Conexion a mysql
try {
    await db.authenticate();
    db.sync();
    console.log("conexion correcta");
} catch (error) {
    console.log(error);
}

// Habilitar Pug
app.set("view engine", "pug");
app.set("views", "./views");

// Carpeta Pública
app.use(express.static("public"));

// Routing
app.use("/auth", usuarioRoutes);

// Definir un puerto y arrancar el proyecto
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`El servidor esta funcionando en el puerto ${port}`);
});
