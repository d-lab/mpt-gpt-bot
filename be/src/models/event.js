'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Event.init({
    provider: DataTypes.STRING,
    metaData: DataTypes.JSON,
    log: DataTypes.JSON
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};