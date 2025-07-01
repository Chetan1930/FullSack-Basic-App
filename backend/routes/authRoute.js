const { register, login, logout } = require('../controllers/authControllers');

const routes=require('express').Router();

routes.post('/register',register)

routes.post('/logout',logout)

routes.post('/login',login)


module.exports = routes;