const express = require('express');
const { addArtist, editArtist, getArtists, deleteArtist } = require('../Controllers/Artist');
const{ Login, Register, checkAuth } = require('../controllers/Auth');
const { addMusic, getMusics, detailMusic, editMusic } = require('../Controllers/Music');
const {Auth} = require('../middlewares/Auth')
const {uploadFile} = require('../middlewares/uploadFile')

const router = express.Router()

router.get('/check-auth',Auth, checkAuth)
router.post('/login', Login)
router.post('/register', Register)

router.get('/artists', Auth, getArtists)
router.post('/artist', Auth, addArtist)
router.patch('/artist/:id', Auth, editArtist)
router.delete('/artist/:id', Auth, deleteArtist)

router.get('/musics', Auth, getMusics)
router.get('/music/:id', Auth, detailMusic)
router.post('/music', Auth,uploadFile('thumbnail','attache'),addMusic)
router.patch('/music/:id', Auth,uploadFile('thumbnail','attache'),editMusic)

module.exports = router