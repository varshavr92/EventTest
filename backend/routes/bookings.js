// const express = require('express');
// const Booking = require('../models/Booking');
// const Event = require('../models/Event');
// const User = require('../models/User');
// const { authenticateToken } = require('../middleware/auth');
// const { sendBookingConfirmation } = require('../utils/email');
// const { generateETicket } = require('../utils/pdfGenerator');

// const router = express.Router();

// // Get user bookings
// router.get('/', authenticateToken, async (req, res) => {
//   try {
//     const bookings = await Booking.find({ userId: req.user.id })
//       .populate('eventId', 'title date time venue ticketPrice image')
//       .sort({ createdAt: -1 });
//     res.json(bookings);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

// // Create booking
// router.post('/', authenticateToken, async (req, res) => {
//   try {
//     const { eventId, tickets } = req.body;
//     const event = await Event.findById(eventId);

//     if (!event) {
//       return res.status(404).json({ message: 'Event not found' });
//     }

//     const totalAmount = event.ticketPrice * tickets;
//     const booking = await Booking.create({
//       userId: req.user.id,
//       eventId,
//       tickets,
//       totalAmount,
//       status: 'confirmed'   
//      });

//     // Generate PDF and send email
//     const user = await User.findById( req.user.id);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     const pdfBuffer = await generateETicket(booking, event, user);
//     const subject = `Your E-Ticket for ${event.title}`;
//     const text = `Hi ${user.name || ''},\n\nThank you for your booking. Attached is your e-ticket for ${event.title}.\n\nTickets: ${tickets}\nTotal: $${totalAmount}\n\nRegards,\nEvent Team`;
//     const html = `<p>Hi ${user.name || ''},</p><p>Thank you for your booking. Attached is your e-ticket for <strong>${event.title}</strong>.</p><p><strong>Tickets:</strong> ${tickets}<br/><strong>Total:</strong> $${totalAmount}</p><p>Regards,<br/>Event Team</p>`;

//     await sendBookingConfirmation(user.email, subject, text, html, [
//       {
//         filename: `e-ticket-${booking._id}.pdf`,
//         content: pdfBuffer,
//         contentType: 'application/pdf'
//       }
//     ]);

//     res.status(201).json(booking);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

// // Download E-Ticket
// router.get('/:id/download', authenticateToken, async (req, res) => {
//   try {
//     const booking = await Booking.findOne({
//       _id: req.params.id,
//       userId: req.user.id
//     }).populate('eventId');

//     if (!booking) {
//       return res.status(404).json({ message: 'Booking not found' });
//     }

//     const user = await User.findById(req.user.id);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     const pdfBuffer = await generateETicket(booking, booking.eventId, user);

//     res.setHeader('Content-Type', 'application/pdf');
//     res.setHeader('Content-Disposition', `attachment; filename=e-ticket-${booking._id}.pdf`);
//     // res.send(pdfBuffer);
//     res.end(pdfBuffer);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

// // Get recommendations
// router.get('/recommendations', authenticateToken, async (req, res) => {
//   try {
//     const { getRecommendations } = require('../utils/recommendations');
//     const recommendations = await getRecommendations(req.user.id);
//     res.json(recommendations);
//   } catch (error) {
//     res.status(500).json({ message: 'Server error', error: error.message });
//   }
// });

// module.exports = router;



const express = require('express');
const Booking = require('../models/Booking');
const Event = require('../models/Event');
const User = require('../models/User');
const { authenticateToken } = require('../middleware/auth');
const { sendBookingConfirmation } = require('../utils/email');
const { generateETicket } = require('../utils/pdfGenerator');

const router = express.Router();

// Get user bookings
router.get('/', authenticateToken, async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id })
      .populate('eventId', 'title date time venue ticketPrice image')
      .sort({ createdAt: -1 });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create booking
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { eventId, tickets } = req.body;
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    const totalAmount = event.ticketPrice * tickets;
    const booking = await Booking.create({
      userId: req.user.id,
      eventId,
      tickets,
      totalAmount
    });

    // Generate PDF and send email
    const user = await User.findById(req.user.id);
    const pdfBuffer = await generateETicket(booking, event, user);
    const subject = `Your E-Ticket for ${event.title}`;
    const text = `Hi ${user.name || ''},\n\nThank you for your booking. Attached is your e-ticket for ${event.title}.\n\nTickets: ${tickets}\nTotal: $${totalAmount}\n\nRegards,\nEvent Team`;
    const html = `<p>Hi ${user.name || ''},</p><p>Thank you for your booking. Attached is your e-ticket for <strong>${event.title}</strong>.</p><p><strong>Tickets:</strong> ${tickets}<br/><strong>Total:</strong> $${totalAmount}</p><p>Regards,<br/>Event Team</p>`;

    try {
      await sendBookingConfirmation(user.email, subject, text, html, [
        {
          filename: `e-ticket-${booking._id}.pdf`,
          content: pdfBuffer,
          contentType: 'application/pdf'
        }
      ]);
    } catch (emailError) {
      console.error('Failed to send booking confirmation email:', emailError);
      // Don't fail the booking if email fails
    }

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Download E-Ticket
router.get('/:id/download', authenticateToken, async (req, res) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      userId: req.user.id
    }).populate('eventId');

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    const user = await User.findById(req.user.id);
    const pdfBuffer = await generateETicket(booking, booking.eventId, user);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=e-ticket-${booking._id}.pdf`);
    res.send(pdfBuffer);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get recommendations
router.get('/recommendations', authenticateToken, async (req, res) => {
  try {
    const { getRecommendations } = require('../utils/recommendations');
    const { interests, searchQuery, clickedEventId } = req.query;
    const interestsArray = interests ? interests.split(',').map(i => i.trim()) : [];

    console.log(`📊 Recommendations request for user ${req.user.id}: interests=${interestsArray}, search=${searchQuery}, clicked=${clickedEventId}`);

  const result = await getRecommendations(req.user.id, interestsArray, searchQuery, clickedEventId);

  const count = Array.isArray(result.recommendations) ? result.recommendations.length : 0;
  console.log(`✅ Returned ${count} recommendations for user ${req.user.id} (method=${result.method})`);

  res.json({ success: true, recommendations: result.recommendations || [], method: result.method });
  } catch (error) {
    console.error('❌ Recommendations API error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;