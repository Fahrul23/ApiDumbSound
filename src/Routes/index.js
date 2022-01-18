const express = require('express');
const{ Login, Register, checkAuth } = require('../controllers/Auth');
const {Auth} = require('../middlewares/Auth')

const router = express.Router()

router.get('/check-auth',Auth, checkAuth)
router.post('/login', Login)
router.post('/register', Register)

module.exports = router