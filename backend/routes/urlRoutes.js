import express from 'express';
import {
  createShortUrl,
  getOriginalUrl,
  getAllUrls,
} from '../controllers/urlController.js';

const router = express.Router();

router.get('/', getAllUrls);  
router.get('/:code', getOriginalUrl);
router.post('/', createShortUrl);

export default router;
