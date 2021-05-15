import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants'

export const cartReducer = (state = { cartItems: [] }, action) => {
    switch(action.type) {
        case CART_ADD_ITEM:
            const item = action.payload 
            const existItem = state.cartItems.find(i => i.product === item.product)

            if(existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(i => i.product === item.product ? item : i )
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }
        case CART_REMOVE_ITEM: 
            const product = action.payload
            const idx = state.cartItems.findIndex(i => i.product === product)
            console.log(idx)
            return {
                ...state,
                cartItems: [
                    ...state.cartItems.slice(0, idx), 
                    ...state.cartItems.slice(idx + 1), 
                ]
            }
            
        default: 
            return state
    }
}