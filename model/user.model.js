
module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        name: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        phone_number: {
            type: Sequelize.STRING(15),
        },
        role: {
            type: Sequelize.STRING,
            defaultValue: "user"
        },
        password: {
            type: Sequelize.STRING
        }
    },
        {
            instanceMethods: {
                toJSON: function () {
                    const values = Object.assign({}, this.get());

                    delete values.password;
                    return values;
                }
            }
        });

    return User;
};