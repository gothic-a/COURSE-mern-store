import { 
    CART_ADD_ITEM, 
    CART_REMOVE_ITEM,
    CART_SAVE_SHIPPING_ADDRESS,
    CART_SAVE_PAYMENT_METHOD
} from '../constants/cartConstants'

const updateTotal = (state, item, type = 'inc') => {

    const itemTotalPrice = item.price * item.qty

    if(type === 'inc') {
        const existItem = state.cartItems.find(i => i.product === item.product)

        if(existItem) {
            const prevItemTotalPrice = existItem.price * existItem.qty

            return (state.totalPrice - prevItemTotalPrice) + itemTotalPrice
        } else {
            return state.totalPrice += itemTotalPrice
        }
        
    } else {
        return state.totalPrice -= itemTotalPrice
    }
}

export const cartReducer = (state = { cartItems: [], shippingAdress: {}, paymentMethod: "", totalPrice: null }, action) => {
    switch(action.type) {
        case CART_ADD_ITEM:
            const item = action.payload 
            const existItem = state.cartItems.find(i => i.product === item.product)

            if(existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(i => i.product === item.product ? item : i ),
                    totalPrice: updateTotal(state, item)
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item],
                    totalPrice: updateTotal(state, item)
                }
            }
        case CART_REMOVE_ITEM: 
            const id = action.payload
            const idx = state.cartItems.findIndex(i => i.product === id)
            const removedItem = state.cartItems[idx]

            return {
                ...state,
                cartItems: [
                    ...state.cartItems.slice(0, idx), 
                    ...state.cartItems.slice(idx + 1), 
                ],
                totalPrice: updateTotal(state, removedItem, 'dec')
            }
        
        case CART_SAVE_SHIPPING_ADDRESS: 
            return {
                ...state,
                shippingAddress: action.payload
            }

        case CART_SAVE_PAYMENT_METHOD: 
            return {
                ...state,
                paymentMethod: action.payload
            }
            
        default: 
            return state
    }
}