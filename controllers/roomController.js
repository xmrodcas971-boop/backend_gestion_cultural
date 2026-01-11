// controllers/roomController.js
const { logMensaje } = require("../utils/logger.js");
const roomService = require("../services/roomService");

class RoomController {
  async getAllRooms(req, res) {
    try {
      const rooms = await roomService.getAllRooms();
      return res.status(200).json({
        ok: true,
        datos: rooms,
        mensaje: "Salas recuperadas correctamente",
      });
    } catch (err) {
      logMensaje("Error en getAllRooms:", err);
      return res.status(500).json({
        ok: false,
        datos: null,
        mensaje: "Error al recuperar salas",
      });
    }
  }
  async createRoom(req, res) {
    const room = req.body;

    try {
      const roomNew = await roomService.createRoom(room);
      return res.status(201).json({
        ok: true,
        datos: roomNew,
        mensaje: "Sala creada correctamente",
      });
    } catch (err) {
      logMensaje("Error en createRoom:", err);
      return res.status(500).json({
        ok: false,
        datos: null,
        mensaje: "Error al crear una sala",
      });
    }
  }
  async getRoomById(req, res) {
    const id_room = req.params.id;
    try {
      const room = await roomService.getRoomById(id_room);
      // room != null -- se ha encontrado la sala
      if (room) {
        return res.status(200).json({
          ok: true,
          datos: room,
          mensaje: "Sala recuperada correctamente",
        });
      } else {
        return res.status(404).json({
          ok: false,
          datos: null,
          mensaje: "Sala no encontrada",
        });
      }
    } catch (err) {
      logMensaje("Error en getRoomById:", err);
      return res.status(500).json({
        ok: false,
        datos: null,
        mensaje: "Error al recuperar una sala",
      });
    }
  }
  async updateRoom(req, res) {
    const id_room = req.params.id;
    const room = req.body;
    try {
      const updatedRows = await roomService.updateRoom(id_room, room);
      if (updatedRows[0] > 0) {
        return res.status(200).json({
          ok: true,
          datos: null,
          mensaje: "Sala actualizada correctamente",
        });
      } else {
        return res.status(404).json({
          ok: false,
          datos: null,
          mensaje: "Sala no encontrada",
        });
      }
    } catch (err) {
      logMensaje("Error en updateRoom:", err);
      return res.status(500).json({
        ok: false,
        datos: null,
        mensaje: "Error al actualizar una sala",
      });
    }
  }
  
  async deleteRoom(req, res) {
    const id_room = req.params.id;
    try {
      const deletedRows = await roomService.deleteRoom(id_room);
      if (deletedRows > 0) {
        //borrado con exito
        return res.status(204).send();
      } else {
        return res.status(404).json({
          ok: false,
          datos: null,
          mensaje: "Sala no encontrada",
        });
      }
    } catch (err) {
      logMensaje("Error en deleteRoom:", err);
      return res.status(500).json({
        ok: false,
        datos: null,
        mensaje: "Error al eliminar una sala",
      });
    }
  }
}

module.exports = new RoomController();
