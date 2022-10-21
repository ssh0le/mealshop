import InputField from "./InputFIeld"
import styled from 'styled-components'
import { useRef, useState } from "react"

const OrderFormWrapper = styled.form`
    padding: 10px;

    & .error {
        font-size: 0.9rem;
        margin: 0;
        border-bottom: 1px solid red;
    }

    & .input-field:not(:last-child) {
        margin-bottom: 20px
    }

    & .action .order .confirm {
        
    }
`

const OrderForm = props => {
    const [formIsValid, setFormIsValid] = useState({
        name: true,
        phone: true,
        city: true,
        adress: true
    });
    const userName = useRef();
    const userPhone = useRef();
    const userCity = useRef();
    const userAdress = useRef();

    const textValidation = value => {
        return value.trim().length > 0; 
    }

    const submitHandler = (e) => {
        e.preventDefault();
        const nameIsValid = textValidation(userName.current.value);
        const phoneIsValid = textValidation(userPhone.current.value);
        const cityIsValid = textValidation(userCity.current.value);
        const adressIsValid = textValidation(userAdress.current.value);

        const formIsValid = nameIsValid && phoneIsValid && cityIsValid && adressIsValid;

        setFormIsValid({
            name: nameIsValid,
            phone: phoneIsValid,
            city: cityIsValid,
            adress: adressIsValid,
        })

        if (formIsValid) {
            props.onConfirm({
                name: userName.current.value,
                phone: userPhone.current.value,
                city: userCity.current.value,
                adress: userAdress.current.value
            });
        }
    }

    const error = <p className="error">Это поле нужно заполнить</p>

    return <OrderFormWrapper onSubmit={submitHandler}>
        <InputField
            label = 'Ваше имя'
            name = 'customername'
            type = 'text'
            className = 'input-field'
            error = {error}
            ref = {userName}
            isValid = {formIsValid.name}
        />
        <InputField
            label='Телефон'
            name = 'phone'
            type = 'text'
            error = {error}
            className = 'input-field'
            ref = {userPhone}
            isValid = {formIsValid.phone}

        />
        <InputField
            label='Город'
            type = 'text'
            name = 'city'
            error = {error}
            className = 'input-field'
            ref = {userCity}
            isValid = {formIsValid.city}
        />
        <InputField
            label='Адрес'
            name = 'adress'
            type = 'text'
            error = {error}
            className = 'input-field'
            ref = {userAdress}
            isValid = {formIsValid.adress}
        />
        <div className="action">
            <button onClick={props.onCancel}>Отмена</button>
            <button className="confirm" type="button" onClick={submitHandler}>Подтвердить</button>
        </div>
    </OrderFormWrapper>
    
}

export default OrderForm;