const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up (queryInterface, Sequelize) {
        return queryInterface.bulkInsert('users', [
            {
                name: 'Admin',
                email: 'admin@admin.com',
                phone_number: '1234567899',
                role: 'admin',
                password: bcrypt.hashSync("123456", 8),
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'User',
                email: 'user@user.com',
                phone_number: '9876543211',
                role: 'user',
                password: bcrypt.hashSync("123456", 8),
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
