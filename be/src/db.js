const Sequelize = require("sequelize");

const dbConfig = {
    host: process.env.DB_HOST || "mpt-gpt-postgres",
    user: process.env.DB_USER || "postgres",
    database: process.env.DB_NAME || "mpt-gpt-db",
    password: process.env.DB_PASSWORD || "postgres",
    port: parseInt(process.env.DB_PORT || "5432")
};

const sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
    host: dbConfig.host,
    dialect: 'postgres',
    operatorsAliases: false,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.event = require("./models/event")(sequelize, Sequelize);

module.exports = db;