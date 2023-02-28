const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();
const db = require('../model');
const User = db.user;

class AuthController {

    static signUp = async (req, res) => {
        try {
            const data = req?.body;

            if (!data?.name) {
                return res.status(400).send({
                    status: 400,
                    message: 'Please enter name'
                });
            }
            if (!data?.email) {
                return res.status(400).send({
                    status: 400,
                    message: 'Please enter email'
                });
            }
            if (!data?.phone_number) {
                return res.status(400).send({
                    status: 400,
                    message: 'Please enter phone number'
                });
            }
            if (!data?.password) {
                return res.status(400).send({
                    status: 400,
                    message: 'Please enter password'
                });
            }

            const user = await User.findOne({
                where: {
                    phone_number: data?.phone_number
                }
            });

            if (user) {
                return res.status(400).send({
                    status: 400,
                    message: 'Phone number is already register please try with new phone number'
                });
            }

            await User.create({
                name: data.name,
                email: data.email,
                phone_number: data.phone_number,
                password: bcrypt.hashSync(data.password, 8),
            });

            return res.status(200).send({
                status: 200,
                message: 'User has been created successfully.'
            });
        } catch (e) {
            return res.status(500).send({
                status: 500,
                message: e.message
            });
        }
    };

    static login = async (req, res) => {
        const data = req?.body;

        if (!data?.phone_number) {
            return res.status(400).send({
                status: 400,
                message: 'Please enter phone number'
            });
        }
        if (!data?.password) {
            return res.status(400).send({
                status: 400,
                message: 'Please enter password'
            });
        }

        const user = await User.findOne({
            where: {
                phone_number: data?.phone_number
            }
        });

        if (user) {
            const validatePassword = await bcrypt.compare(data?.password, user.password);

            if (validatePassword) {
                const token = jwt.sign(
                    {userId: user.id},
                    process.env.JWT_SECRET,
                    {expiresIn: process.env.JWT_TOKEN_VALIDITY}
                );

                return res.status(200).send({
                    status: 200,
                    message: 'Logged in successfully.',
                    access_token: token
                });
            }

            return res.status(400).send({
                status: 400,
                message: 'Please enter valid password'
            });
        }

        return res.status(400).send({
            status: 400,
            message: 'You are not registered with us.'
        });
    };
}

module.exports = AuthController;