const jwt = require('jsonwebtoken');
const db = require('./model');
const User = db.user;

module.exports = {
    async getUserFromJwt(token) {
        try {
            const jwtPayload = jwt.verify(token, process.env.JWT_SECRET);

            if (typeof jwtPayload == "string") {
                return null;
            } else {
                //Get user role from the database
                return await User.findOne({
                    where: {
                        id: jwtPayload.userId
                    }
                });
            }
        } catch (error) {
            //If token is not valid, respond with 401 (unauthorized)
            return null;
        }
    },

    async isAdmin(req, res, next) {

        if (req?.user && req?.user?.role == 'admin') {
            next();
        } else {
            res.status(401).send({
                status: 401,
                message : "You are restricted to access this api."
            });
        }
    },

    async paginate(page = 1, pageSize = 10) {
        const offset = ((page - 1) * pageSize);
        const limit = pageSize;

        return {
            offset,
            limit,
        };
    }
}