import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import { cartReducer } from './reducers/cartReducers'
import { 
    productListReducer, 
    productReducer,
    productReviewCreateReducer,
} from './reducers/productReducers'
import { 
    userLoginReducer, 
    userRegisterReducer, 
    userDetailsReducer, 
    userUpdateProfileReducer 
} from './reducers/userReducers'
import {
    orderCreateReducer,
    getOrderDetailsReducer,
    orderPayReducer,
    orderMyListReducer
} from './reducers/orderReducers'

import { composeWithDevTools } from 'redux-devtools-extension'

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productReducer,
    productReviewCreate: productReviewCreateReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    orderCreate: orderCreateReducer,
    orderDetails: getOrderDetailsReducer,
    orderPay: orderPayReducer,
    orderMyList: orderMyListReducer
})

const getDataFromStorage = (key) => {
    if(localStorage.getItem(key)) {
        return JSON.parse(localStorage.getItem(key))
    } else {
        return null
    }
}

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {}
const paymentMethodFromStorage = localStorage.getItem('paymentMethod') ? JSON.parse(localStorage.getItem('paymentMethod')) : {}
const totalPriceFromStorage = localStorage.getItem('totalPrice') ? JSON.parse(localStorage.getItem('totalPrice')) : ''

const initialState = {
    cart: {
        cartItems: cartItemsFromStorage,
        shippingAddress: shippingAddressFromStorage,
        paymentMethod: paymentMethodFromStorage,
        totalPrice: totalPriceFromStorage,
    },
    userLogin: { 
        userInfo: userInfoFromStorage, 
    }
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store