const Sequelize = require("sequelize");
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql'
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../model/user.model.js")(sequelize, Sequelize);
db.product = require("../model/product.model.js")(sequelize, Sequelize);
db.order = require("../model/order.model.js")(sequelize, Sequelize);

db.user.hasMany(db.order, { as: "orders" });
db.order.belongsTo(db.user, {
    foreignKey: "userId",
    as: "user",
});

// db.user.sync({ force: true });
// db.order.sync({ force: true });
// db.product.sync({ force: true });
// sequelize.sync({ force: true });

module.exports = db;