import express from 'express'
import { protect } from '../middleware/authMidd.js'
import { 
    createOrder, 
    getOrderById, 
    updateOrderToPaid,
    getMyOrders 
} from '../controllers/orderControllers.js'

const router = express.Router()

router.route('/').post(protect, createOrder)
router.route('/myorders').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid)

export default router