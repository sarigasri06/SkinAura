const express = require('express');
const router = express.Router();
const {
  getAllOrders,
  updateOrderStatus,
  getDashboardStats,
} = require('../controllers/adminController');
const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddleware');

router.use(protect);
router.use(admin);

router.get('/orders', getAllOrders);
router.put('/orders/:id/status', updateOrderStatus);
router.get('/stats', getDashboardStats);

module.exports = router;
