const express = require('express');
const router  = express.Router();
const Complaint = require('../models/Complaint');

// Register a new complaint
router.post('/', async (req, res) => {
  try {
    const complaint = new Complaint(req.body);
    await complaint.save();
    res.status(201).json(complaint);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all complaints (with optional ?assignedTo= filter)
router.get('/', async (req, res) => {
  try {
    const filter = {};
    if (req.query.assignedTo) filter.assignedTo = req.query.assignedTo;
    const complaints = await Complaint.find(filter).sort({ createdAt: -1 });
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ⚠️  MUST be before /:id routes — otherwise Express matches 'summary' as an :id
router.get('/stats/summary', async (req, res) => {
  try {
    const total    = await Complaint.countDocuments();
    const pending  = await Complaint.countDocuments({ status: 'Pending' });
    const assigned = await Complaint.countDocuments({ status: 'Assigned' });
    const resolved = await Complaint.countDocuments({ status: 'Resolved' });
    res.json({ total, pending, assigned, resolved });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get complaint status by ID
router.get('/:id/status', async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id).select('status complaint name createdAt');
    if (!complaint) return res.status(404).json({ error: 'Complaint not found' });
    res.json(complaint);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Assign complaint to agent + optional priority
router.put('/:id/assign', async (req, res) => {
  try {
    const update = { assignedTo: req.body.assignedTo, status: 'Assigned' };
    if (req.body.priority) update.priority = req.body.priority;
    const complaint = await Complaint.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!complaint) return res.status(404).json({ error: 'Complaint not found' })
    res.json(complaint);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update status (agent use)
router.put('/:id/status', async (req, res) => {
  try {
    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!complaint) return res.status(404).json({ error: 'Complaint not found' });
    res.json(complaint);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
