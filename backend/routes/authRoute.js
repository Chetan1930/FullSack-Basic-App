const { register, login, logout } = require('../controllers/authControllers');

const routes=require('express').Router();


// routes.get('/register',register)

routes.post('/register',register)

routes.post('/register',register)

routes.post('/logout',logout)


// routes.get('/login',)

routes.post('/login',login)


module.exports = routes;