import express from 'express';
import { createRequest, getMyRequests, getRequestsForDonor, updateRequestStatus, getAllRequests } from '../controllers/requestController.js';
import { protect, admin, donor } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, createRequest);
router.get('/myrequests', protect, getMyRequests);
router.get('/donor-requests', protect, donor, getRequestsForDonor);
router.put('/:id/status', protect, donor, updateRequestStatus);
router.get('/', protect, admin, getAllRequests); // Admin only

export default router;
