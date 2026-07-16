const express    = require('express');
const mongoose   = require('mongoose');
const dotenv     = require('dotenv');
const cors       = require('cors');
const path       = require('path');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Serve static frontend files
app.use(express.static(path.join(__dirname, '../frontend')));

// API routes
const complaintRoutes = require('./routes/complaintRoutes');
app.use('/api/complaints', complaintRoutes);

// Fallback: serve index.html for any unknown route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    const PORT = process.env.PORT || 7000;
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch(err => console.error('MongoDB connection error:', err));
