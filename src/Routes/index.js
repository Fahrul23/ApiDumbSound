const express = require('express');
const { addArtist, editArtist, getArtists, deleteArtist } = require('../Controllers/Artist');
const{ Login, Register, checkAuth } = require('../controllers/Auth');
const {Auth} = require('../middlewares/Auth')

const router = express.Router()

router.get('/check-auth',Auth, checkAuth)
router.post('/login', Login)
router.post('/register', Register)

router.get('/artists', Auth, getArtists)
router.post('/artist', Auth, addArtist)
router.patch('/artist/:id', Auth, editArtist)
router.delete('/artist/:id', Auth, deleteArtist)

module.exports = router