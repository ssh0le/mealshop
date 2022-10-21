import styled from 'styled-components'
import { forwardRef, useImperativeHandle } from 'react'
import React from 'react'

const InputFieldWrapper = styled.div`
    display: flex;
    flex-direction: column;

    & label {
        margin-bottom: 5px;
    }

    & input {
        font-size: 1rem;
        padding: 5px 10px;
        border: none;
        border-radius: 10px;
        outline: none;
    }
`

const InputField = React.forwardRef((props, ref) => {
    return <InputFieldWrapper className={props.className}>
        <label htmlFor={props.name}>{props.label}</label>
        <input ref = {ref} type={props.type} id={props.name}/>
        {!props.isValid && props.error}
    </InputFieldWrapper>
})

export default InputField;