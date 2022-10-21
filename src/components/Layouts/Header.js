import styled from 'styled-components'
import HeaderCartButton from './HeaderCartButton'

const HeaderWrapper = styled.div`
width: 100%;
margin: 0;
padding: 0;
display: flex;
flex-direction: column;
justify-content: space-between;
align-items: center;

& header {
    height: 80px;
    width: 90%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 2px solid #51585e;
    border-radius: 15px;
    box-sizing: border-box;
    margin: 5px 0;
    padding: 0 20px;
}

& h1 {
    margin: 0;
}
`

const Header = props => {

    return(
        <HeaderWrapper>
            <header>
                <div className='logo-wrapper'>
                    <h1>Meals</h1>
                </div>
                <HeaderCartButton onClick={props.onClick}></HeaderCartButton>
            </header>
        </HeaderWrapper>
    )
}

export default Header;