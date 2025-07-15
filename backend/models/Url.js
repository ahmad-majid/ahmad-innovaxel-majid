import mongoose from 'mongoose';

const urlSchema = new mongoose.Schema({
  url: { type: String, required: true },
  shortCode: { type: String, unique: true, required: true },
  accessCount: { type: Number, default: 0 }
}, { timestamps: true });

const Url = mongoose.model('Url', urlSchema);

export default Url;
