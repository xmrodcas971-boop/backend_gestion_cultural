var DataTypes = require("sequelize").DataTypes;
var _museum = require("./museum");
var _room = require("./room");

function initModels(sequelize) {
  var museum = _museum(sequelize, DataTypes);
  var room = _room(sequelize, DataTypes);

  room.belongsTo(museum, { as: "museum", foreignKey: "museum_id"});
  museum.hasMany(room, { as: "rooms", foreignKey: "museum_id"});

  return {
    museum,
    room,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
