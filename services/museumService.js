// services/museumService.js
// Servicio para interactuar con el modelo Sequelize `museums`

// Importar operadores de Sequelize
const { Op } = require("sequelize");
// Sirve para usar operadores avanzados de Sequelize en las consultas (WHERE)

// Recuperar función de inicialización de modelos
const initModels = require("../models/init-models.js").initModels;
// Crear la instancia de sequelize con la conexión a la base de datos
const sequelize = require("../config/sequelize.js");
// Cargar las definiciones del modelo en sequelize
const models = initModels(sequelize);
// Recuperar el modelo museum
const Museum = models.museum;

class MuseumService {
  async getAllMuseums() {
    // Devuelve todos los museos
    const result = await Museum.findAll();
    return result;
  }
  async getMuseumById(id_museum) {
    // Devuelve un museo por su id
    const result = await Museum.findByPk(id_museum);
    return result;
  }
  async createMuseum(museum) {
    //Crea un museo
    const result = await Museum.create(museum);
    return result;
  }
  async updateMuseum(id_museum, museum) {
    // Actualiza un museo por su id
    const result = await Museum.update(museum, {
      where: { museum_id: id_museum },
    });
    return result;
  }
  async deleteMuseum(id_museum) {
    // Elimina un museo por su id
    const result = await Museum.destroy({
      where: { museum_id: id_museum },
    });
    return result;
  }
  async getMuseumsByBudgetRange(min, max) {
    const result = await Museum.findAll({
      where: {
        annual_budget: {
          [Op.between]: [min, max],
        },
      },
    });

    return result;
  }
  async getMuseumsBetweenDates(from, to) {
    const result = await Museum.findAll({
      where: {
        opening_date: {
          [Op.between]: [from, to],
        },
      },
    });
    return result;
  }
}

module.exports = new MuseumService();
