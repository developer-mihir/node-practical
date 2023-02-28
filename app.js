const express = require('express');
const {getUserFromJwt} = require('./helper.js');
const app = express();
const port = 3000;
const routes = require('./routes/index.js');
const router = express.Router();
const authRoute = require('./routes/auth.route.js');
const fileUpload = require("express-fileupload");
const authRoutes = router.use('/auth', authRoute);

app.use(express.json());

// Auth routes
app.use(authRoutes);

// To upload file
app.use(fileUpload());

// Middleware to restrict guest users
async function middleware(req, res, next) {
    const token = req.headers["access_token"] || '';
    const user = await getUserFromJwt(token);

    if (user) {
        req.user = user;
        return next();
    }

    return res.status(401).send({
         status: 401,
         message : "Unauthorized"
     });
};

app.use(middleware);

// Init all other routes expect auth
app.use(routes);

app.get('/', (res, req) => {
    return req.send("Node practical.");
});

app.listen(port);