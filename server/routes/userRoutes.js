import express from 'express';
import { getDonors, getUserProfile, updateUserAvailability, deleteUser, updateUserProfile } from '../controllers/userController.js';
import { protect, admin, donor } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/donors', getDonors);
router.get('/profile', protect, getUserProfile);
router.put('/availability', protect, donor, updateUserAvailability);
router.put('/profile', protect, updateUserProfile);
router.delete('/:id', protect, admin, deleteUser);

export default router;
