import { useRef } from 'react'
import styled from 'styled-components'
import { useContext } from 'react'
import CartContext from '../../store/cart-context'

const MealItemWrapper = styled.li`
    list-style-type: none;
    display: block;
    margin: 0;
    display: flex;
    justify-content: space-between;
    padding: 10px;

    & * {
        margin: 0;
    }

    & .item-info {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    }

    & .item-description {
        text-align: left;
        margin: 10px 0;
    }

    & .item-price {
        border-bottom: 3px solid #f93; 
    }

    & .controls {
        display: flex;
        align-items: center;
    }

    & button {
        font-size: 0.9rem;
        background-color: white;
        color: black;
        border: 1px solid black;
        border-radius: 10px;        
        padding: 10px;
        margin: 10px;
    }

    & input {
        font-size: 1.1rem;
        width: 40px
    }
`

const MealItem = props => {
    const enteredAmountRef = useRef();
    const cartCtx = useContext(CartContext);
    const price = `${props.price} р.`

    const addToCart = amount => {
        cartCtx.addItem({
            id: props.id,
            name: props.name,
            price: props.price,
            amount: amount
        })
    }
    
    const clickHandler = () => {
        const enteredAmount = enteredAmountRef.current.value;
        if (enteredAmount.trim().length === 0) {
            return;
        }

        addToCart(+enteredAmount);
    }

    return <MealItemWrapper>
        <div className='item-info'>
            <h3 className="item-name">{props.name}</h3>
            <p className="item-description">{props.description}</p>
            <div className="item-price">{price}</div>
        </div>
        <div className='controls'>
            <input
                ref = {enteredAmountRef}
                type="number"
                max = '10'
                min = '1'
                size = '2'
                defaultValue='1'
             />
             <button onClick={clickHandler}>Добавить</button>
        </div>
    </MealItemWrapper>
}

export default MealItem;