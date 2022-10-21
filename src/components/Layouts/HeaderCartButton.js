import { useContext } from 'react'
import CartContext from '../../store/cart-context'
import styled from 'styled-components'
import icon from '../../assets/cart.png'

const ButtonWrapper = styled.button`
    height: 70%;
    display: flex;
    background-color: #FF9933;
    border-radius: 10px;
    border: none;
    color: white;
    display: flex;
    align-items: center;
    font-size: 1rem;
    padding: 10px;

    & .icon {
        background-color: white;
        border-radius: 20px;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 10px;
    }

    & img {
        width: 30px;
    }

    & .badge {
        background-color: white;
        border-radius: 15px;
        padding: 5px;
        color: black;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 10px
    }

`

const HeaderCartButton = props => {
    const cartCtx = useContext(CartContext);

    const numberOfItems = cartCtx.items.reduce((currentNumber, item) => {
        return currentNumber + +item.amount;
    }, 0);

    return (
        <ButtonWrapper onClick={props.onClick}>
            <span className="icon">
                <img src={icon} alt="" />
            </span>
            <span>Корзина</span>
            <span className='badge'>{numberOfItems}</span>
        </ButtonWrapper>
    )
}

export default HeaderCartButton;