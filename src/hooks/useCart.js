import React from 'react'
import { AppContext } from '../context';

export const useCart = () => {
    const { cartItems, setCartItems, setCartOpened } = React.useContext(AppContext)
    const totalPrice = new Intl.NumberFormat('ru-RU').format(cartItems.reduce((sum, obj) => obj.price + sum, 0));
    return { cartItems, setCartItems, totalPrice, setCartOpened }
}
