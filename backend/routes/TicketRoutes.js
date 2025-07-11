// routes/ticketRoutes.js
const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');

// Create new ticket
router.post('/', async (req, res) => {
  try {
    const newTicket = new Ticket(req.body);
    await newTicket.save();
    res.status(201).json(newTicket);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all tickets (with filtering)
router.get('/', async (req, res) => {
  const { status, priority } = req.query;
  const filter = {};
  if (status) filter.status = status;
  if (priority) filter.priority = priority;

  try {
    const tickets = await Ticket.find(filter);
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
