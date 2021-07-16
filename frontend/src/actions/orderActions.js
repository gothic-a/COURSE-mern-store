import axios from 'axios'
import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_SUCCESS,
    ORDER_CREATE_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS,
    ORDER_PAY_FAIL,
    ORDER_MY_LIST_REQUEST,
    ORDER_MY_LIST_SUCCESS,
    ORDER_MY_LIST_FAIL,
} from '../constants/orderConstants'


const orderCreate = (order) => async (dispatch, getState) => {

    dispatch({
        type: ORDER_CREATE_REQUEST
    })

    try {
        const { userLogin: {userInfo} } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        const { data } = await axios.post('/api/orders', order, config)

        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data,
        })
    } catch(error) {
        const payload = (
            error.response && error.response.message
            ? error.response.message
            : error.message
        )

        dispatch({
            type: ORDER_CREATE_FAIL,
            payload
        })
    }
}

const getOrderById = (id) => async (dispatch, getState) => {
    dispatch({
        type: ORDER_DETAILS_REQUEST
    })

    const { userLogin: { userInfo } } = getState()

    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            } 
        }

        const { data } = await axios.get(`/api/orders/${id}`, config)

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data,
        })

    } catch(error) {
        const payload = (
            error.response && error.response.message
            ? error.response.message
            : error.message
        )

        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload
        })
    }
}

const payOrder = (id, paymentResult) => async (dispatch, getState) => {
    dispatch({
        type: ORDER_PAY_REQUEST
    })

    const { userLogin: { userInfo } } = getState()

    try {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            } 
        }

        const { data } = await axios.put(`/api/orders/${id}/pay`, paymentResult, config)

        dispatch({
            type: ORDER_PAY_SUCCESS,
            payload: data,
        })

    } catch(error) {
        const payload = (
            error.response && error.response.message
            ? error.response.message
            : error.message
        )

        dispatch({
            type: ORDER_PAY_FAIL,
            payload
        })
    }
}

const myListOrders = () => async (dispatch, getState) => {
    dispatch({
        type: ORDER_MY_LIST_REQUEST
    })

    const { userLogin: { userInfo } } = getState()

    try {
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            } 
        }

        const { data } = await axios.get(`/api/orders/myorders`, config)

        dispatch({
            type: ORDER_MY_LIST_SUCCESS,
            payload: data,
        })

    } catch(error) {
        const payload = (
            error.response && error.response.message
            ? error.response.message
            : error.message
        )

        dispatch({
            type: ORDER_MY_LIST_FAIL,
            payload
        })
    }
}

export {
    orderCreate,
    getOrderById,
    payOrder,
    myListOrders
}