import express from 'express';
import {
  createShortUrl,
  getOriginalUrl,
  getAllUrls,
  updateUrl,
  deleteUrl
} from '../controllers/urlController.js';

const router = express.Router();

// ✅ 
router.post('/', createShortUrl);
router.get('/', getAllUrls);
router.put('/:code', updateUrl);
router.delete('/:code', deleteUrl);
router.get('/:code', getOriginalUrl);

export default router;
