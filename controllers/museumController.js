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
  async updateMuseum(req, res) {
    const id_museum = req.params.id;
    const museum = req.body;
    try {
      const updatedRows = await museumService.updateMuseum(id_museum, museum);
      if (updatedRows[0] > 0) {
        return res.status(200).json({
          ok: true,
          datos: null,
          mensaje: "Museo actualizado correctamente",
        });
      } else {
        return res.status(404).json({
          ok: false,
          datos: null,
          mensaje: "Museo no encontrado",
        });
      }
    } catch (err) {
      logMensaje("Error en updateMuseum:", err);
      return res.status(500).json({
        ok: false,
        datos: null,
        mensaje: "Error al actualizar un museo",
      });
    }
  }
  async deleteMuseum(req, res) {
    const id_museum = req.params.id;
    try {
      const deletedRows = await museumService.deleteMuseum(id_museum);
      if (deletedRows > 0) {
        //borrado con exito
        return res.status(204).send();
      } else {
        return res.status(404).json({
          ok: false,
          datos: null,
          mensaje: "Museo no encontrado",
        });
      }
    } catch (err) {
      logMensaje("Error en deleteMuseum:", err);
      return res.status(500).json({
        ok: false,
        datos: null,
        mensaje: "Error al eliminar un museo",
      });
    }
  }
  async getMuseumsByBudgetRange(req, res) {
    const { min, max } = req.query;

    // Validaciones básicas
    if (!min || !max) {
      return res.status(400).json({
        ok: false,
        datos: null,
        mensaje: "Debe indicar presupuesto mínimo y máximo",
      });
    }

    if (Number(min) > Number(max)) {
      return res.status(400).json({
        ok: false,
        datos: null,
        mensaje: "El presupuesto mínimo no puede ser mayor que el máximo",
      });
    }

    try {
      const museums = await museumService.getMuseumsByBudgetRange(min, max);

      if (museums.length > 0) {
        return res.status(200).json({
          ok: true,
          datos: museums,
          mensaje: "Museos recuperados correctamente",
        });
      } else {
        return res.status(404).json({
          ok: false,
          datos: null,
          mensaje: "No existen museos en ese rango de presupuesto",
        });
      }
    } catch (err) {
      logMensaje("Error en getMuseumsByBudgetRange:", err);
      return res.status(500).json({
        ok: false,
        datos: null,
        mensaje: "Error al filtrar museos por presupuesto",
      });
    }
  }

  async getMuseumsBetweenDates(req, res) {
    const { from, to } = req.query;

    // parámetros obligatorios
    if (!from || !to) {
      return res.status(400).json({
        ok: false,
        datos: null,
        mensaje: "Debe indicar fecha de inicio (from) y fecha de fin (to)",
      });
    }

    // from y to deben ser fechas válidas
    if (new Date(from) > new Date(to)) {
      return res.status(400).json({
        ok: false,
        datos: null,
        mensaje: "La fecha de inicio no puede ser posterior a la fecha de fin",
      });
    }
    // Llamada al servicio (solo si todo es válido)
    try {
      const museums = await museumService.getMuseumsBetweenDates(from, to);

      if (museums.length > 0) {
        return res.status(200).json({
          ok: true,
          datos: museums,
          mensaje: "Museos recuperados correctamente",
        });
      } else {
        return res.status(404).json({
          ok: false,
          datos: null,
          mensaje: "No existen museos en ese rango de fechas",
        });
      }
    } catch (err) {
      logMensaje("Error en getMuseumsBetweenDates:", err);
      return res.status(500).json({
        ok: false,
        datos: null,
        mensaje: "Error al recuperar museos entre fechas",
      });
    }
  }
}

module.exports = new MuseumController();
