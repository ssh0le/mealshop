import styled from 'styled-components'
import { useContext } from 'react'
import CartContext from '../../store/cart-context'

const CartItemWrapper = styled.li`
    list-style-type: none;
    margin: 0;
    padding: 10px;
    color: #fff;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    align-items: center;
    justify-content: space-between;

    & h3 {
        margin: 0;
        width: 40%;
        text-align: left;
    }

    & .price {
        text-align: right;
    }

    & .controls {
        display: flex;
        justify-content: flex-end;
        gap: 15px;
    }

    & .controls button {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        border: none;
        font-size: 1.3rem
    }
`

const CartItem = props => {
    const price = `${props.price}р.`
    const cartCtx = useContext(CartContext);

    const addClickHandler = () => {
        cartCtx.addItem({
            id: props.id,
            name: props.name,
            amount: 1,
            price: props.price
        });
    }

    const removeClickHandler = () => {
        cartCtx.removeItem({id: props.id, price: props.price});
        if (cartCtx.totalAmount === props.price){
            props.onCheck();
        }
    }

    return <CartItemWrapper>
        <h3>{props.name}</h3>
        <div className="price">{price}</div>
        <div className="controls">
            <span className="amount">{props.amount}</span>
            <button className="add" onClick={addClickHandler}>+</button>
            <button className="remove" onClick={removeClickHandler}>-</button>
        </div>
    </CartItemWrapper>
}

export default CartItem;