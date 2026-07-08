const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  name:        { type: String, required: true, trim: true },
  email:       { type: String, required: true, trim: true },
  phone:       { type: String, required: true, trim: true },
  complaint:   { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  status:      { type: String, enum: ['Pending', 'Assigned', 'In Progress', 'Resolved'], default: 'Pending' },
  assignedTo:  { type: String, default: null },
  priority:    { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
}, { timestamps: true });

module.exports = mongoose.model('Complaint', complaintSchema);
