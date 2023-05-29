import React from 'react'
import { useCart } from '../hooks/useCart';

const Info = ({ image, title, description }) => {

    const { setCartOpened } = useCart()

    return (
        <div className="drawer__empty">
            <img src={image} alt="" className="drawer__empty-img" />
            <h2 className="drawer__empty-title">{title}</h2>
            <p className="drawer__empty-text">{description}</p>
            <button onClick={() => setCartOpened(false)} className="drawer__empty-btn button">
                <span>Вернуться назад</span>
            </button>
        </div>
    )
}

export default Info;
