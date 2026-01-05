const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('room', {
    room_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    area: {
      type: DataTypes.DECIMAL(8,2),
      allowNull: false
    },
    is_climatized: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    opening_date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    museum_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'museum',
        key: 'museum_id'
      }
    }
  }, {
    sequelize,
    tableName: 'room',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "room_id" },
        ]
      },
      {
        name: "fk_room_museum",
        using: "BTREE",
        fields: [
          { name: "museum_id" },
        ]
      },
    ]
  });
};
