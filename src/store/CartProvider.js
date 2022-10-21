import { useReducer } from "react"
import CartContext from "./cart-context"

const defaultCartState= {
    items: [],
    totalAmount: 0
}

const cartReducer = (state, action) => {
    if (action.type === 'CLEAR') {
        return defaultCartState;
    }
    const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id);
    const existingItem = state.items[existingCartItemIndex];
    if (action.type === 'ADD') {
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount; 
        let updatedItems;
        if (existingItem) {
            const updatedItem = {
                ...existingItem,
                amount: existingItem.amount + action.item.amount
            };
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }
        else {
            updatedItems = state.items.concat(action.item);
        }
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        };
    } else if (action.type === 'REMOVE') {
        let updatedItems;
        const updatedTotalAmount = state.totalAmount - action.item.price;
        if (existingItem.amount === 1) {
            updatedItems = state.items.filter(item => item.id !== existingItem.id);
        } else {
            const updatedItem = {
                ...existingItem,
                amount: existingItem.amount - 1
            }
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        }
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    } else {
        return defaultCartState;
    }
}

const CartProvider = props => {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);
    
    const addItemToCartHandler = item => {
        dispatchCartAction({type: 'ADD', item: item});
    }

    const removeItemFromCartHandler = item => {
        dispatchCartAction({type: 'REMOVE', item: item});
    }

    const clearCartHandler = () => {
        dispatchCartAction({type: 'CLEAR'});
    }

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
        clearCart: clearCartHandler
    }

    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
}

export default CartProvider;