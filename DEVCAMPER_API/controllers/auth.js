const crypto = require('crypto')
const User = require('../models/User')
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const sendEmail = require('../utils/sendEmail')

exports.register = asyncHandler(async (req, res, next) => {
    const { name, email, password, role } = req.body
    const user = await User.create({ name, email, password, role })
    sendTokenResponse(user, 200, res)

})

exports.login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body
    if (!email || !password) {
        return next(new ErrorResponse('please provied email and password', 400))
    }
    const user = await User.findOne({ email }).select('+password')
    if (!user) {
        return next(new ErrorResponse('Invalid credentials ', 401))
    }
    const isMatch = await user.isMatchPassword(password)
    if (!isMatch) {
        return next(new ErrorResponse('Invalid credentials ', 401))
    }
    sendTokenResponse(user, 200, res)

})

exports.getMe = asyncHandler(async (req, res, next) => {
    console.log(req.user.id)

    const user = await User.findById(req.user.id)

 res.status(200).json({
      success: true,
      data: user
    });
})
    

exports.logout = asyncHandler(async (req, res, next) => {
    res.cookie('token', 'node', {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true
    });
  
    return res.status(200).json({
      success: true,
      data: {}
    });
  });

exports.forgotpassword = asyncHandler(async (req, res, next) => {

    const user = await User.findOne({ email: req.body.email })

    if (!user) {
        return next(new ErrorResponse('There is no user of this email', 404))
    }

    const resetToken = user.getResetPasswordToken()
    await user.save({ validateBeforeSave: false })
    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/auth/resetpassword/${resetToken}`
    const message = `your are receving this mail becouse you request to reset your passward please click this link 
     ${resetUrl}`
    console.log(user.email)
    try {
        await sendEmail({
            email: user.email,
            subject: 'Password Reset',
            message
        })
        res.
            status(200).
            send({
                success: true,
                data: 'Email send'
            })
    } catch (error) {
        //console.log(error)
        user.resetPasswordToken = undefined
        user.resetPasswordExpire = undefined
        await user.save({ validateBeforeSave: false })
        return next(new ErrorResponse('Email was not send', 500))
    }

})

exports.resetPassword = asyncHandler(async (req, res, next) => {

    const resetPasswordToken = crypto.createHash('sha256').update(req.params.resetToken).digest('hex')
    let user = await User.findOne({ resetPasswordToken, resetPasswordExpire: { $gt: Date.now() } })

    if (!user) {
        return next(new ErrorResponse('Resend the mail the session expire', 400))
    }
    user.password = req.body.password
    user.resetPasswordToken = undefined
    user.resetPasswordExpire = undefined
    await user.save()
    sendTokenResponse(user, 200, res)

})

const sendTokenResponse = (user, statusCode, res) => {
    const token = user.generateAuthToken()
    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true
    }

    res.
        status(statusCode).
        cookie('token', token, options).
        send({
            success: true,
            token
        })
}