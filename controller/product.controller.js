const db = require('../model');
const Product = db.product;
const {paginate} = require('../helper.js');

class ProductController {

    // Get all products
    static getAll = async (req, res) => {
        try {
            const {offset, limit} = await paginate(req?.query?.page,2);

            const products = await Product.findAll({
                offset,
                limit,
                order : [
                    ['id', 'DESC']
                ]
            });

            return res.status(200).send({
                status: 200,
                message: 'Products retrieved successfully.',
                data: products
            });
        } catch (e) {
            return res.status(500).send({
                status: 500,
                message: e.message
            });
        }
    };

    // Get product by id
    static getOne = async (req, res) => {
        try {
            const id = req?.params?.id;
            const product = await Product.findOne({
                where : {
                    id : id
                }
            });

            if (product) {
                return res.status(200).send({
                    status: 200,
                    message: 'Product retrieved successfully.',
                    data: product
                });
            }

            return res.status(400).send({
                status: 400,
                message: 'Product not found.',
                data: product
            });
        } catch (e) {
            return res.status(500).send({
                status: 500,
                message: e.message
            });
        }
    };

    // Create product
    static create = async (req, res) => {
        return res.status(400).send({
            status: 400,
            message: 'Please enter name'
        });

        try {
            const data = req?.body;
            if (!data?.name) {
                return res.status(400).send({
                    status: 400,
                    message: 'Please enter name'
                });
            }
            if (!data?.price) {
                return res.status(400).send({
                    status: 400,
                    message: 'Please enter price'
                });
            }
            if (!data?.quantity) {
                return res.status(400).send({
                    status: 400,
                    message: 'Please enter quantity'
                });
            }

            const product = await Product.create({
                name: data?.name,
                size: data?.size,
                colour: data?.colour,
                price: data?.price,
                quantity: data?.quantity
            });

            return res.status(200).send({
                status: 200,
                message: 'Product created successfully.',
                data: product
            });
        } catch (e) {
            return res.status(500).send({
                status: 500,
                message: e.message
            });
        }
    };

    // Update product
    static update = async (req, res) => {
        try {
            const id = req?.params?.id;
            const data = req?.body;

            if (!data?.name) {
                return res.status(400).send({
                    status: 400,
                    message: 'Please enter name'
                });
            }
            if (!data?.price) {
                return res.status(400).send({
                    status: 400,
                    message: 'Please enter price'
                });
            }
            if (!data?.quantity) {
                return res.status(400).send({
                    status: 400,
                    message: 'Please enter quantity'
                });
            }

            await Product.update({
                name: data?.name,
                size: data?.size,
                colour: data?.colour,
                price: data?.price,
                quantity: data?.quantity
            }, {
                where: {
                    id: id
                }
            });

            const product = await Product.findOne({
                where : {
                    id : id
                }
            });

            return res.status(200).send({
                status: 200,
                message: 'Product updated successfully.',
                data: product
            });
        } catch (e) {
            return res.status(500).send({
                status: 500,
                message: e.message
            });
        }
    };
}

module.exports = ProductController;