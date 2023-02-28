
module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("products", {
        name: {
            type: Sequelize.STRING
        },
        size: {
            type: Sequelize.STRING
        },
        colour: {
            type: Sequelize.STRING
        },
        price: {
            type: Sequelize.DECIMAL(10, 2)
        },
        quantity: {
            type: Sequelize.INTEGER
        }
    });

    return Product;
};