import express from 'express';
import {
  createShortUrl,
  getOriginalUrl,
  getAllUrls,
  updateUrl
} from '../controllers/urlController.js';

const router = express.Router();

router.get('/', getAllUrls);  
router.get('/:code', getOriginalUrl);
router.post('/', createShortUrl);
router.put('/:code', updateUrl);
export default router;
