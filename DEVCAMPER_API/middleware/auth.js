const jwt = require('jsonwebtoken')
const User = require('../models/User')
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('./async')

exports.protect = asyncHandler(async (req, res, next) => {
    let token;
  // console.log('in protected')
  // console.log(`in protected  ${req.headers.authorization}`)
   
    if (req.headers.authorization) {
        // Set token from Bearer token in header
        token = req.headers.authorization.split(' ')[1];
       // console.log(token)

    }
    //  else if (req.cookie.token) {
    //     // Set token from cookie
    //     console.log('cookies token ')
    //     token = req.cookies.token;
    // }

    // Make sure token exists
    if (!token) {
        return next(new ErrorResponse('Not authorized to access this route token', 401));
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id);
        console.log(req.user.id)

        next();
    } catch (err) {
        return next(new ErrorResponse('Not authorized to access this route err', 401));
    }
})

exports.authorize = (...roles) => {
    return (req, res, next) => {

        if (!roles.includes(req.user.role)) {
            return next(new ErrorResponse(`User role ${req.user.role} is not authorize to access this route`, 403));
        }
        next()
    }
}