const express = require('express');
const router = express.Router();
const destinations = require('../controllers/destinations');
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAUthor, validateDestination } = require('../middleware');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const Destination = require('../models/destination');

router.route('/')
    .get(catchAsync(destinations.index))
    //.post(isLoggedIn, validateDestination, catchAsync(destinations.createDestination))
    .post(upload.array('image'), (req, res) => {
        console.log(req.body, req.files);
        res.send("IT WORKED!")
    })

router.get('/new', isLoggedIn, destinations.renderNewForm)

router.route('/:id')
    .get(catchAsync(destinations.showDestination))
    .put(isLoggedIn, isAUthor, validateDestination, catchAsync(destinations.updateDestination))
    .delete(isLoggedIn, isAuthor, catchAsync(destinations.deleteDestination));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(destinations.renderEditForm))

module.exports = router;