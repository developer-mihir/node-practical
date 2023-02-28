
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {
        return queryInterface.bulkInsert('products', [
            {
                name: 't shirt',
                size: 'small',
                colour: 'red',
                price: 50,
                quantity: 5,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'shirt',
                size: 'medium',
                colour: 'red',
                price: 60,
                quantity: 5,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'pent',
                size: 'large',
                colour: 'red',
                price: 30,
                quantity: 5,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 't shirt',
                size: 'extra large',
                colour: 'red',
                price: 40,
                quantity: 5,
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
