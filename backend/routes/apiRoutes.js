const authRoutes = require('./authRoute');
const movieRoutes = require('./movieRoute');
const bookingRoutes = require('./bookingRoute');
const express = require('express');
const router=express.Router()


router.use('/auth', authRoutes);
router.use('/movies', movieRoutes);
router.use('/bookings', bookingRoutes);

module.exports=router;
