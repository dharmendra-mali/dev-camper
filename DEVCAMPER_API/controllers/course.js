const Bootcamp = require('../models/Bootcampe')
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const Course = require('../models/Course')

exports.getCourses = asyncHandler(async (req, res, next) => {
    

    if (req.params.bootcampId) {
        const courses = await Course.find({ bootcamp: req.params.bootcampId })
        return  res.
        status(200).
        send({ success: true, count: courses.length, data: courses });
    } else {
        res.
        status(200).
        send(res.advancedResult);
    }

})

exports.getCourse = asyncHandler(async (req, res, next) => {

    const course = await Course.findById(req.params.id).populate({
        path: 'bootcamp',
        select: 'name description'
    })
    if (!course) {
        return next(ErrorResponse(`No Course with the id of ${req.params.id}`, 404))
    }

    res.
        status(200).
        send({ success: true, data: course });

})

exports.addCourse = asyncHandler(async (req, res, next) => {
    req.body.bootcamp = req.params.bootcampId
    console.log(req.params.bootcampId)
    const bootcamp = await Bootcamp.findById(req.params.bootcampId)
    if (!bootcamp) {
        return next(new ErrorResponse(`No Bootcamp with the id of ${req.params.bootcampId}`, 404))
    }

    const course = await Course.create(req.body)
    res.
        status(200).
        send({ success: true, data: course });

})

exports.updateCourse = asyncHandler(async (req, res, next) => {

    let course = await Course.findById(req.params.id)
    if (!course) {
        return next(new ErrorResponse(`No Course with the id of ${req.params.id}`, 404))
    }

    course = await Course.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    })

    res.
        status(200).
        send({ success: true, data: course });

})

exports.deleteCourse = asyncHandler(async (req, res, next) => {

    const course = await Course.findById(req.params.id)
    if (!course) {
        return next(new ErrorResponse(`No Course with the id of ${req.params.id}`, 404))
    }

    await course.remove()
    res.
        status(200).
        send({ success: true, data: {} });

})