const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Define the Mongoose schema for booking
const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  tickets: { type: Number, required: true },
  places: { type: String, required: true },
  start_date: { type: Date, required: true },
  end_date: { type: Date, required: true },
  payment: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address1: { type: String, required: true },
  address2: { type: String },
  pin: { type: String, required: true }
});

const Booking = mongoose.model('Booking', bookingSchema);

// Route to handle booking form submission
router.post('/', async (req, res) => {
  try {
    console.log('Booking request received:', req.body); // Log request data

    const newBooking = new Booking({
      name: req.body.name,
      tickets: parseInt(req.body.tickets, 10),
      places: req.body.places,
      start_date: new Date(req.body.start_date),
      end_date: new Date(req.body.end_date),
      payment: req.body.payment,
      email: req.body.email,
      phone: req.body.phone,
      address1: req.body.address1,
      address2: req.body.address2,
      pin: req.body.pin
    });

    // Save booking details to the database
    await newBooking.save();
    console.log('Booking saved successfully:', newBooking); // Log successful booking
    res.send('Booking confirmed'); // Send response to client
  } catch (err) {
    console.error('Error during booking:', err);
    res.status(500).send('Failed to book');
  }
});

module.exports = router;
