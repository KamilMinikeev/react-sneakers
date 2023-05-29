import React from 'react'
import { Link } from "react-router-dom";

import { useCart } from '../hooks/useCart';

function Header({ onClickCart, onClickFavorite }) {

    // const [isOpen, setIsOpen] = React.useState(false)

    const { totalPrice } = useCart()


    const open = () => {
        onClickCart()
    }
    const favorites = () => {
        onClickFavorite()
    }


    return (
        <header className="header">
            <Link to="/">
                <div className="header__content">
                    <img alt="" src="/images/logo.png"></img>
                    <div className="header__info">
                        <h3>React Sneakers</h3>
                        <p>Магазин лучших кроссовок</p>
                    </div>
                </div>
            </Link>
            <ul className="header__list">
                <li onClick={open} style={{ cursor: 'pointer' }}>
                    <img alt="" src="/images/basket.svg"></img>
                    <span>{totalPrice} руб.</span>
                </li>
                <li onClick={favorites} style={{ cursor: 'pointer' }}>
                    <Link to="/favorites">
                        <img alt="" src="/images/favorite.svg"></img>
                    </Link>
                </li>

                <li style={{ cursor: 'pointer' }}>
                    <Link to="/orders">
                        <img alt="" src="/images/user.svg"></img>
                    </Link>
                </li>
            </ul>
        </header>
    )
}

export default Header;
