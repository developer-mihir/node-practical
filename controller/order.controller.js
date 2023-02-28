const {v4 : uuidv4} = require('uuid');
const moment = require('moment');
const db = require('../model');
const {paginate} = require('../helper.js');
const Order = db.order;
const Product = db.product;

class OrderController {

    // Get orders by logged in user
    static getAllByUser = async (req, res) => {
        try {
            const userId = req?.user?.id;
            const {offset, limit} = await paginate(req?.query?.page,2);

            const orders = await Order.findAll({
                offset,
                limit,
                order : [
                    ['id', 'DESC']
                ],
                where : {
                    userId : userId
                }
            });

            return res.status(200).send({
                status: 200,
                message: 'Orders retrieved successfully.',
                data: orders
            });
        } catch (e) {
            return res.status(500).send({
                status: 500,
                message: e.message
            });
        }
    };

    // Get specific order by logged in user
    static getOneByUser = async (req, res) => {
        try {
            const userId = req?.user?.id;
            const id = req?.params?.id;

            const order = await Order.findOne({
                where : {
                    userId : userId,
                    id : id
                }
            });

            if (!order) {
                return res.status(400).send({
                    status: 400,
                    message: 'Order not found.'
                });
            }

            return res.status(200).send({
                status: 200,
                message: 'Order retrieved successfully.',
                data: order
            });
        } catch (e) {
            return res.status(500).send({
                status: 500,
                message: e.message
            });
        }
    };

    // Create order by user
    static createOrder = async (req, res) => {
        try {
            const data = req?.body;
            const userId = req?.user?.id;

            if (!data?.productId) {
                return res.status(400).send({
                    status: 400,
                    message: 'Product not found.'
                });
            }
            if (!data?.quantity) {
                return res.status(400).send({
                    status: 400,
                    message: 'Please enter quantity.'
                });
            }

            const product = await Product.findOne({
                where : {
                    id : data?.productId
                }
            });

            if (!product) {
                return res.status(400).send({
                    status: 400,
                    message: 'Product not found.'
                });
            }
            if (product.quantity < data?.quantity) {
                return res.status(400).send({
                    status: 400,
                    message: 'Product quantity not available.'
                });
            }

            const order = await Order.create({
                order_code: uuidv4(),
                quantity: data?.quantity,
                order_status: 'Ordered',
                shipped_date: moment().toDate(),
                userId : userId
            });

            await Product.update({
                quantity: (product.quantity - data?.quantity)
            }, {
                where: {
                    id: data?.productId
                }
            });

            return res.status(200).send({
                status: 200,
                message: 'Order created successfully.',
                data: order
            });
        } catch (e) {
            return res.status(500).send({
                status: 500,
                message: e.message
            });
        }
    };

    // Get all orders by admin
    static getAllByAdmin = async (req, res) => {
        try {
            const {offset, limit} = await paginate(req?.query?.page,2);

            const orders = await Order.findAll({
                offset,
                limit,
                order : [
                    ['id', 'DESC']
                ]
            });

            return res.status(200).send({
                status: 200,
                message: 'Orders retrieved successfully.',
                data: orders
            });
        } catch (e) {
            return res.status(500).send({
                status: 500,
                message: e.message
            });
        }
    };

    // Get specific order by admin
    static getOneByAdmin = async (req, res) => {
        try {
            const id = req?.params?.id;

            const order = await Order.findOne({
                where : {
                    id : id
                }
            });

            if (!order) {
                return res.status(400).send({
                    status: 400,
                    message: 'Order not found.'
                });
            }

            return res.status(200).send({
                status: 200,
                message: 'Order retrieved successfully.',
                data: order
            });
        } catch (e) {
            return res.status(500).send({
                status: 500,
                message: e.message
            });
        }
    };
}

module.exports = OrderController;