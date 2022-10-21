import { useState} from "react"

const useValidation = (validateValue) => {
    const [enteredValue, setEnteredValue] = useState('')
    const [isTouched, setIsTouched] = useState(false);

    const valueIsValid = validateValue(enteredValue) || !isTouched;

    const onChange = event => {
         setEnteredValue(event.target.value);
    }

    const onBlur = () => {
        setIsTouched(true);
    }

    return {
        isValid: valueIsValid,
        onChange,
        onBlur
    }
}

export default useValidation;