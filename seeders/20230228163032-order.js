const {v4 : uuidv4} = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {
        return queryInterface.bulkInsert('orders', [
            {
                order_code: uuidv4(),
                quantity: 1,
                order_status: 'ordered',
                shipped_date: new Date(),
                userId: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                order_code: uuidv4(),
                quantity: 2,
                order_status: 'ordered',
                shipped_date: new Date(),
                userId: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                order_code: uuidv4(),
                quantity: 2,
                order_status: 'ordered',
                shipped_date: new Date(),
                userId: 2,
                createdAt: new Date(),
                updatedAt: new Date()
            },
        ]);
    },

    async down (queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    }
};
