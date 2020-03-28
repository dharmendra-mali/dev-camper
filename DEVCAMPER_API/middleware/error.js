const ErrorResponse = require('../utils/errorResponse')
const errorHandler = (error, req, res, next) => {
    let err = { ...error }
    err.message = error.message
    // console.log(error)
    if (error.name === 'CastError') {
        const message = `Bootcamp not found with id of ${error.value._id}`
        err = new ErrorResponse(message, 404)
    }
    if (error.code === 11000) {
        const message = `Duplicate field value entered`
        err = new ErrorResponse(message, 400)
    }

    // Mongoose validatoin error
    if (error.name === 'ValidationError') {
        const message = Object.values(error.errors).map(val => val.message);
        err = new ErrorResponse(message, 400);
    }
    res.status(err.statusCode || 500).send({
        success: false,
        error: err.message || 'server Error'
    });
}

module.exports = errorHandler