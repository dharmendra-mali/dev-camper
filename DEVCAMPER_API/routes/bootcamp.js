const express = require('express')
const {
    getBootcamps,
    getBootcamp,
    createBootcamps,
    updateBootcamp,
    deleteBootcamp,
    getBootcampInRadius,
    bootcampUploadPhoto
} = require('../controllers/bootcamp')

const advancedResult = require('../middleware/advanceResult')
const Bootcamp = require('../models/Bootcampe')
//Include other resource router
const courseRouter = require('./course')
const reviewRouter = require('./review')
const { protect, authorize } = require('../middleware/auth')
const router = express.Router()

//re-route into other resource router
router.use('/:bootcampId/courses', courseRouter)
router.use('/:bootcampId/reviews', reviewRouter)


router.
    route('/radius/:zipcode/:distance').
    get(getBootcampInRadius)

router.
    route('/:id/photo').
    put(bootcampUploadPhoto)

router.
    route('/').
    get(advancedResult(Bootcamp, 'Courses'), getBootcamps).
    post(protect, authorize('publisher', 'admin'), createBootcamps)

router.
    route('/:id').
    get(getBootcamp).
    put(protect, authorize('publisher', 'admin'), updateBootcamp).
    delete(protect, authorize('publisher', 'admin'), deleteBootcamp)

module.exports = router