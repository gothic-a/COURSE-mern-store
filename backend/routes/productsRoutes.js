import { Router } from 'express'
import { protect } from '../middleware/authMidd.js'
import { 
    getProducts, 
    getProductById,
    createProductReview 
} from '../controllers/productControllers.js'

const router = Router()

router.get('/',  getProducts)
router.get('/:id', getProductById)
router.route('/:id/review').post(protect, createProductReview)

export default router