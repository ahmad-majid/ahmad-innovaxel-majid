import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import urlRoutes from './routes/urlRoutes.js';
import { getOriginalUrl } from './controllers/urlController.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ✅ Mount routes at root to enable short redirects like /FW9a9J
app.use('/shorten', urlRoutes);
app.get('/:code', getOriginalUrl); // for redirection


const PORT = process.env.PORT || 5000;

// Connect to MongoDB and start the server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });
