// controllers/museumController.js
const { logMensaje } = require("../utils/logger.js");
const museumService = require("../services/museumService");

class MuseumController {
  async getAllMuseums(req, res) {
    try {
      const museums = await museumService.getAllMuseums();
      return res.status(200).json({
        ok: true,
        datos: museums,
        mensaje: "Museos recuperados correctamente",
      });
    } catch (err) {
    logMensaje("Error en getAllMuseums:", err);
      return res.status(500).json({
        ok: false,
        datos: null,
        mensaje: "Error al recuperar museos",
      });
    }
  }
  async createMuseum(req, res) {
    const museum = req.body;

    try {
      const museumNew = await museumService.createMuseum(museum);
      return res.status(201).json({
        ok: true,
        datos: museumNew,
        mensaje: "Museo creado correctamente",
      });
    
    } catch (err) {
      logMensaje("Error en createMuseum:", err);
      return res.status(500).json({
        ok: false,
        datos: null,
        mensaje: "Error al crear un museo",
      });
    }
  }
  async getMuseumById(req, res) {
    const id_museum = req.params.id;
    try {
      const museum = await museumService.getMuseumById(id_museum);
      // museum != null -- se ha encontrado el museo
      if (museum) {
        return res.status(200).json({
          ok: true,
          datos: museum,
          mensaje: "Museo recuperado correctamente",
        });
      } else {
        return res.status(404).json({
          ok: false,
          datos: null,
          mensaje: "Museo no encontrado",
        });
      }
    } catch (err) {
      logMensaje("Error en getMuseumById:", err);
      return res.status(500).json({
        ok: false,
        datos: null,
        mensaje: "Error al recuperar un museo",
      });
    }
  }
}

module.exports = new MuseumController();
