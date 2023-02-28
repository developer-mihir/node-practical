
module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define("orders", {
        order_code: {
            type: Sequelize.STRING
        },
        quantity: {
            type: Sequelize.INTEGER
        },
        order_status: {
            type: Sequelize.STRING
        },
        shipped_date: {
            type: Sequelize.DATE
        }
    });

    return Order;
};