import { 
    PRODUCT_REQUEST,
    PRODUCT_SUCCESS,
    PRODUCT_FAIL,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS, 
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_RESET,
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS, 
    PRODUCT_CREATE_REVIEW_FAIL,
    PRODUCT_CREATE_REVIEW_RESET,
} from '../constants/productConstants'

export const productListReducer = (state = { products: [], productsOnScreen: 0 }, action) => {
    switch(action.type) {
        case PRODUCT_LIST_REQUEST: 
            return { 
                loading: true,
                products: state.products,
                error: null,
                ...state,
            }
        case PRODUCT_LIST_SUCCESS: {
            const { page, pageSize, pageCount, totalProductsCount } = action.payload

            let products = []

            if(action.payload.inseartHead) {
                products = [
                    ...action.payload.products,
                    ...state.products,
                ]
            } else {
                products = [
                    ...state.products,
                    ...action.payload.products
                ]
            }

            let firstPage = 0
            let lastPage = 0

            if(state.firstPage && state.lastPage) {
                firstPage = page < state.firstPage ? page : state.firstPage 
                lastPage = page > state.lastPage ? page : state.lastPage 
            } else {
                firstPage = page
                lastPage = page
            }

            return { 
                loading: false, 
                products,
                page,
                pageCount,
                pageSize,
                totalProductsCount,
                productsOnScreen: state.productsOnScreen + action.payload.products.length,
                firstPage,
                lastPage
            }
        }
        case PRODUCT_LIST_FAIL:
            return { 
                loading: false, 
                error: action.payload 
            }
        case PRODUCT_LIST_RESET: 
            return {
                products: [], 
                productsOnScreen: 0
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