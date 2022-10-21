import Header from './components/Layouts/Header';
import './App.css';
import styled from 'styled-components'
import MealList from './components/Meals/MealsList';
import Cart from './components/Cart/Cart';
import { useState } from 'react';
import CartProvider from './store/CartProvider';

const AppWrapper = styled.div`
  color: #fff;
  background-color: #1A1C1A;
  height: 100vh;

  & button {
    cursor: pointer;
  }
`

function App() {
  const [cartIsOpen, setCartIsOpen] = useState(false);

    const openCart = () => {
      setCartIsOpen(true);
    }
    const closeCart = () => {
      setCartIsOpen(false);
    }
  return (
    <CartProvider>
      <AppWrapper className='App'>
        {cartIsOpen && <Cart onClose={closeCart}></Cart>}
        <Header onClick={openCart}></Header>
        <MealList></MealList>
      </AppWrapper>
    </CartProvider>
  );
}

export default App;
