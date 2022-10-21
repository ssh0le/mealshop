import styled from 'styled-components'
import { Fragment } from 'react'
import ReactDOM from 'react-dom'

const BackdropWrapper = styled.div`
    position: fixed;
    width: 100vw;
    height: 100vh;
    background-color: rgba(8,8,8, .5);
    //z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
`

const Backdrop = props => {
    return <BackdropWrapper onClick={props.onClick}>
        {props.children}
    </BackdropWrapper>
}

const portalElement = document.getElementById('layouts');

const Modal = props => {

    return <Fragment>
        {ReactDOM.createPortal(<Backdrop onClick={props.onClick} >{props.children}</Backdrop>, portalElement)}
        {/*ReactDOM.createPortal(<Backdrop onClick={props.onClick} />, portalElement)*/}
    </Fragment>
}

export default Modal;