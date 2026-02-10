// ============================================
// IMPORTACIONES
// ============================================
const express = require("express");
const path = require("path");
const cors = require("cors");
const { logMensaje } = require("./utils/logger.js");
//const config = require('./config');

// Rutas de la API
const museumRoutes = require("./routes/museumRoutes");
const roomRoutes = require("./routes/roomRoutes");

// ============================================
// INICIALIZACIÓN
// ============================================
const app = express();
const port = process.env.PORT || 3000;

// ============================================
// MIDDLEWARE - PARSEO
// ============================================
app.use(express.json());

// ============================================
// MIDDLEWARE - CORS - Cualquier origen
// ============================================
app.use(cors());

// ============================================
// MIDDLEWARE - ARCHIVOS ESTÁTICOS
// ============================================
app.use(express.static(path.join(__dirname, "public")));

// ============================================
// RUTAS - API REST
// ============================================
app.use("/api/museums", museumRoutes);
app.use("/api/rooms", roomRoutes);

// ============================================
// RUTAS - SPA (Catch-all)
// ============================================
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });

// ============================================
// SERVIDOR
// ============================================
if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
  });
}
// Exportamos la aplicación para poder hacer pruebas
module.exports = app;
