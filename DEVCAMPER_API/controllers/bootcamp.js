const path = require('path')
const Bootcamp = require('../models/Bootcampe')
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const geocoder = require('../utils/geocoder')


exports.getBootcamps = asyncHandler(async (req, res, next) => {
    res.send(res.advancedResult)

})

exports.getBootcamp = asyncHandler(async (req, res, next) => {

    const bootcamp = await Bootcamp.findById({ _id: req.params.id });
    if (!bootcamp) {
        return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404))
    }
    res.send({ success: true, data: bootcamp });

})

exports.createBootcamps = asyncHandler(async (req, res, next) => {
    req.body.user = req.user._id

    const publishedBootcamp = await Bootcamp.findOne({ user: req.user.id })

    if (publishedBootcamp && req.user.role !== 'admin') {
        return next(new ErrorResponse(`the user id ${req.params.id} has already published a bootcamp`, 400))
    }

    const bootcamp = await Bootcamp.create(req.body)
    res.status(201).send({ success: true, data: bootcamp })

})

exports.updateBootcamp = asyncHandler(async (req, res, next) => {

    let bootcamp = await Bootcamp.findById(req.params.id)
    if (!bootcamp) {
        return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404))
    }

    if (req.user._id !== bootcamp.user.toString() && req.user.role !== 'admin') {
        return next(new ErrorResponse(`User  ${req.params.id} is not Authrized to update this bootcamp`, 400))
    }
    bootcamp = await findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    res.status(200).send({ success: true, data: bootcamp })

})

exports.deleteBootcamp = asyncHandler(async (req, res, next) => {

    const bootcamp = await Bootcamp.findById(req.params.id)

    if (!bootcamp) {
        return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404))
    }
    bootcamp.remove();
    res.status(200).send({ success: true, data: {} })

})



exports.bootcampUploadPhoto = asyncHandler(async (req, res, next) => {

    const bootcamp = await Bootcamp.findById(req.params.id)

    if (!bootcamp) {
        return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404))
    }
    if (!req.files) {
        return next(new ErrorResponse(`please upload the file `, 400))
    }
    const file = req.files.file
    if (!file.mimetype.startsWith('image')) {
        return next(new ErrorResponse(`please upload the phots file `, 400))
    }
    if (file.size > process.env.MAX_FILE_UPLOAD) {
        return next(new ErrorResponse(`please upload image less then ${process.env.MAX_FILE_UPLOAD}`, 400))

    }
    file.name = `photo_${bootcamp._id}${path.parse(file.name).ext}`
    file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async (err) => {
        if (err) {
            console.log(err)
            return next(new ErrorResponse(`problem with file upload `, 500))
        }
    })

    await Bootcamp.findByIdAndUpdate(bootcamp._id, {
        photo: file.name
    })

    res.status(200).send({ success: true, data: file.name })
})


exports.getBootcampInRadius = asyncHandler(async (req, res, next) => {

    const { zipcode, distance } = req.params;


    // Get lat/lng from geocoder
    const loc = await geocoder.geocode(zipcode);
    const lat = loc[0].latitude;
    const lng = loc[0].longitude;
    // console.log(lat, lng)
    // Calc radius using radians
    // Divide dist by radius of Earth
    // Earth Radius = 3,963 mi / 6,378 km
    const radius = distance / 3963;
    // console.log(radius)
    const bootcamps = await Bootcamp.find({
        location: { $geoWithin: { $centerSphere: [[lng, lat], radius] } }
    });
    res.send({ success: true, count: bootcamps.length, data: bootcamps })


})