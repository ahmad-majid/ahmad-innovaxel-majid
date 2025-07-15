import express from 'express';
import {
  createShortUrl,
  getOriginalUrl,
  getAllUrls,
  updateUrl,
  deleteUrl
} from '../controllers/urlController.js';

const router = express.Router();

router.get('/', getAllUrls);  
router.get('/:code', getOriginalUrl);
router.post('/', createShortUrl);
router.put('/:code', updateUrl);
router.delete('/:code', deleteUrl
);
export default router;
