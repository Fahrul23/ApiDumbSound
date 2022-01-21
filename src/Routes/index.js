const express = require('express');
const { addArtist, editArtist, getArtists, deleteArtist } = require('../Controllers/Artist');
const{ Login, Register, checkAuth } = require('../controllers/Auth');
const { addMusic, getMusics, detailMusic, deleteMusic } = require('../Controllers/Music');
const { getTransaction, detailTransaction, addTransaction, approveTransaction, deleteTransaction } = require('../Controllers/Transaction');
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
// router.patch('/music/:id', Auth,uploadFile('thumbnail','attache'),editMusic)
router.delete('/music/:id', Auth, deleteMusic)

router.get('/transaction/:id', Auth, detailTransaction)
router.get('/transactions', Auth, getTransaction)
router.post('/transaction', Auth,uploadFile('attache'),addTransaction)
router.patch('/transaction/:id', Auth, approveTransaction)
router.delete('/transaction/:id', Auth, deleteTransaction)

module.exports = router