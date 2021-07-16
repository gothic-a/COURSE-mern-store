import axios from 'axios'
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

export const listProducts = (keyword = "", page = 1, pageSize = 4, sortBy = 'popularity', sortDirection = -1) => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST})

        const inseartHead = page < getState().productList.page 

        if(keyword) dispatch({type: PRODUCT_LIST_RESET})
        const { data } = await axios.get(`/api/products?keyword=${keyword}&page=${page}&pageSize=${pageSize}&sortBy=${sortBy}&orderDirection=${sortDirection}`)
        dispatch({ type: PRODUCT_LIST_SUCCESS, payload: { ...data, inseartHead } })
    } catch(err) {
        
        dispatch({ 
            type: PRODUCT_LIST_FAIL, 
            payload: err.response && err.response.data.message 
                ? err.response.data.message 
                : err.message
        })
    }
    
}

export const productDetails = (id) => async (dispatch) => {
    try {
        dispatch({type: PRODUCT_REQUEST})

        const { data } = await axios.get(`/api/products/${id}`)
        dispatch({type: PRODUCT_SUCCESS, payload: data})
    } catch(err) {
        dispatch({type: PRODUCT_FAIL, payload: err})
    }
}

export const createReview = (id, raiting, comment) => async (dispatch, getState) => {
    dispatch({type: PRODUCT_CREATE_REVIEW_REQUEST})

    try {
        const { userLogin: { userInfo: { token } } } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }

        const { data } = await axios.post(`/api/products/${id}/review`, { raiting, comment }, config)

        if(data.message) dispatch({type: PRODUCT_CREATE_REVIEW_SUCCESS})

    } catch(error) {
        const payload = (
            error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message  
        )
        
        dispatch({
            type: PRODUCT_CREATE_REVIEW_FAIL,
            payload
        })
    }
}