// services/roomService.js
// Servicio para interactuar con el modelo Sequelize `rooms`

// Recuperar función de inicialización de modelos
const initModels = require("../models/init-models.js").initModels;
// Crear la instancia de sequelize con la conexión a la base de datos
const sequelize = require("../config/sequelize.js");
// Cargar las definiciones del modelo en sequelize
const models = initModels(sequelize);
// Recuperar el modelo room
const Room = models.room;

class RoomService {
  async getAllRooms() {
    // Devuelve todas las salas
    const result = await Room.findAll();
    return result;
  }
   async getRoomById(id_room) {
    // Devuelve una sala por su id
    const result = await Room.findByPk(id_room);
    return result;
  }
  async createRoom(room) {
    //Crea una sala
    const result = await Room.create(room);
    return result;
  }
}

module.exports = new RoomService();
