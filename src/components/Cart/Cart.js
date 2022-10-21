import styled from 'styled-components'
import CartItem from './CartItem';
import { useContext, useState } from 'react';
import CartContext from '../../store/cart-context';
import Modal from '../UI/Modal';
import OrderForm from '../UI/OrderForm';

const CartWrapper = styled.div`
    width: 40vw;
    font-size: 1.5rem;
    box-sizing: border-box;
    color: #fff;
    border: 2px solid #51585e;
    border-radius: 15px;
    padding: 10px;
    background-color: #1A1C1A;

    & h2 {
        text-align: center;
    }

    & ul {
        margin: 0;
        padding: 0 0 0;
        border: 3px solid #f93;
        border-radius: 10px;
        overflow-y: auto;
        max-height: 500px;
    }

    & .total {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        padding: 10px;
        border: 3px solid transparent;
    }

    & .title {
        text-align: left;
        font-size: 1.4rem; 
    }

    & .action {
        display: flex;
        justify-content: flex-end;
        align-items: center;
    }

    & .action button{
        font-size: 1rem;
        background-color: white;
        color: black;
        border: 1px solid black;
        border-radius: 10px;        
        padding: 10px;
        margin: 10px;
    }

    & .action .order, .action .confirm {
        background-color: #f93;
        color: white;
    }

    & .empty {
        text-align: center;
    }

    & .price {
        text-align: right;
    }

    & .cart-error {
        text-align: center;
        font-size: 1.2rem;
        animation: 1.5s appearance;
    }

    @keyframes appearance {
        0% {
            opacity: 0;
            color: red;
        } 100% {
            opacity: 1;
            color: inherit;
        }
    }
`

const Cart = props => {
    const [formIsActive, setFormIsActive] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [orderIsSubmited, setOrderIsSubmited] = useState(false);
    const cartCtx = useContext(CartContext);
    const price = `${cartCtx.totalAmount}р.`;
    const cartIsEmpty = cartCtx.items.length === 0;

    const orderButtonClickHandler = () => {
        if (cartIsEmpty) {
            setHasError(true);
            return;
        }
        setFormIsActive(true);
    }

    const cartCheckHandler = () => {
        if (formIsActive) {
            setFormIsActive(false);
            setHasError(true);
        }
    }

    const cartClickHandler = e => {
        e.stopPropagation();
    }

    const confirmOrder = async (data) => {
        const url = `https://mealshop-c9c1f-default-rtdb.europe-west1.firebasedatabase.app/orders.json`;
        await fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                customerData: data,
                orderedItems: cartCtx.items
            })
        });
        setOrderIsSubmited(true);
        cartCtx.clearCart();
    }

    if (orderIsSubmited) {
        return <Modal onClick={props.onClose}>
            <CartWrapper onClick={cartClickHandler}>
                <p>Заказ принят на обработку</p>
                <div className="action">
                    <button onClick={props.onClose}>Закрыть</button>
                </div>
            </CartWrapper>
        </Modal>
    }

    return <Modal onClick={props.onClose}>
        <CartWrapper onClick={cartClickHandler}>
        {formIsActive && <OrderForm onConfirm={confirmOrder} onCancel={props.onClose}/>}
        <h2>Ваша корзина</h2>
        {cartIsEmpty && <p className='empty'>Здесь пока ничего нет</p>}
        {!cartIsEmpty && <ul>
            {cartCtx.items.map(item => <CartItem onCheck = {cartCheckHandler} id = {item.id} amount ={item.amount} name={item.name} price={item.price}></CartItem> )}
        </ul>}
        {!cartIsEmpty && <div className = "total">
            <span className = "title">Общая сумма</span>
            <span className = "price">{price}</span>
        </div>}
        {!formIsActive && 
        <div className="action">
            <button onClick={props.onClose}>Закрыть</button>
            <button className='order' onClick={orderButtonClickHandler}>Заказать</button>
        </div>}
        {hasError && <p className='cart-error'>Для заказа нужно выбрать блюда</p>}
    </CartWrapper>
    </Modal>
}

export default Cart;