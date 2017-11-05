const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');
const config = require('./database');

let database = null;

const loadModels = (sequelize) => {
  const dir = path.join(__dirname, '../models');
  const models = [];
  fs.readdirSync(dir).forEach((file) => {
    const modelDir = path.join(dir, file);
    const model = sequelize.import(modelDir);
    models[model.name] = model;
  });
  return models;
};

module.exports = () => {
  if (!database) {
    const sequelize = new Sequelize(
      config.database,
      config.username,
      config.password,
      config.params,
    );

    database = {
      sequelize,
      Sequelize,
      models: {},
    };

    database.models = loadModels(sequelize);

    sequelize.sync().done(() => database);
  }
  return database;
};
