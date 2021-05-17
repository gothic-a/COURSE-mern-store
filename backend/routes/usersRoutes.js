import { Router } from 'express'
import { registerUser, authUser, getUserProfile } from '../controllers/userControllers.js'
import { protect } from '../middleware/authMidd.js'

const router = Router()

router.route('/').post(registerUser)
router.post('/login', authUser)
router.route('/profile').get(protect, getUserProfile)

export default router