import express from 'express'
import {
    getPayPalConfig,
    getLiqPayConfig,
    getLiqPayPaymentStatus
} from '../controllers/payControllers.js'
import { protect } from '../middleware/authMidd.js'

const router = express.Router()

router.route('/paypal/config').get(getPayPalConfig)
router.route('/liqpay/config').post(getLiqPayConfig)
router.route('/liqpay/status/callback').post(getLiqPayPaymentStatus)

export default router