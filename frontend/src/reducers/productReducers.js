import { 
    PRODUCT_REQUEST,
    PRODUCT_SUCCESS,
    PRODUCT_FAIL,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS, 
    PRODUCT_LIST_FAIL,
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS, 
    PRODUCT_CREATE_REVIEW_FAIL,
    PRODUCT_CREATE_REVIEW_RESET,
} from '../constants/productConstants'

export const productListReducer = (state = { products: [] }, action) => {

    switch(action.type) {
        case PRODUCT_LIST_REQUEST: 
            return { 
                loading: true, 
                products: [] 
            }
        case PRODUCT_LIST_SUCCESS:
            return { 
                loading: false, 
                products: action.payload 
            }
        case PRODUCT_LIST_FAIL:
            return { 
                loading: false, 
                error: action.payload 
            }
        default:
            return state
    }
}

export const productReducer = (state = { product: {} }, action) => {
    switch(action.type) {
        case PRODUCT_REQUEST: 
            return {
                loading: true,
                product: {}
            }
        case PRODUCT_SUCCESS:
            return {
                loading: false,
                product: action.payload
            }
        case PRODUCT_FAIL: 
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

export const productReviewCreateReducer = (state = { }, action) => {
    switch(action.type) {
        case PRODUCT_CREATE_REVIEW_REQUEST:
            return {
                loading: true
            }
        case PRODUCT_CREATE_REVIEW_SUCCESS:
            return {
                loading: false,
                success: true,
            }
        case PRODUCT_CREATE_REVIEW_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case PRODUCT_CREATE_REVIEW_RESET:
            return {}
        default: 
            return state
    }
}