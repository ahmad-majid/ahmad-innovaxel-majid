import Url from '../models/Url.js';
import generateShortCode from '../utils/generateShortCode.js';
import validUrl from 'valid-url';

// Create short URL
export const createShortUrl = async (req, res) => {
  const { url } = req.body;
  if (!url || !validUrl.isWebUri(url)) {
    return res.status(400).json({ error: 'Invalid or missing URL' });
  }

  try {
    const existing = await Url.findOne({ url });
    if (existing) {
      return res.status(200).json(existing);
    }

    // Generate unique shortCode
    let shortCode;
    let exists = true;
    while (exists) {
      shortCode = generateShortCode();
      exists = await Url.findOne({ shortCode });
    }

    const newUrl = await Url.create({ url, shortCode });
    res.status(201).json(newUrl);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all URLs
export const getAllUrls = async (req, res) => {
  try {
    const urls = await Url.find().sort({ createdAt: -1 }); // newest first
    res.status(200).json(urls);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get original URL by short code
export const getOriginalUrl = async (req, res) => {
  const { code } = req.params;

  try {
    const urlDoc = await Url.findOne({ shortCode: code });
    if (!urlDoc) {
      return res.status(404).json({ error: 'Short URL not found' });
    }

    urlDoc.accessCount++;
    await urlDoc.save();

    res.status(200).json(urlDoc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
