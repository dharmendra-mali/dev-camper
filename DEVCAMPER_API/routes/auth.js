const express = require('express')

const {
    register,
    login,
    getMe,
    forgotpassword,
    resetPassword
} = require('../controllers/auth')

const { protect } = require('../middleware/auth')
const router = express.Router()
router.get('/getme',protect, getMe)
router.post('/register', register)
router.post('/login', login)
router.post('/forgotpassword', forgotpassword)
router.put('/resetpassword/:resetToken', resetPassword)


module.exports = router