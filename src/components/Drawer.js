import React from 'react';
import axios from 'axios';

import { useCart } from '../hooks/useCart';

import Info from './Info';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))


function Drawer({ items = [], onClickDelete, opened }) {

    const { cartItems, setCartItems, totalPrice, setCartOpened } = useCart()

    const [isOrdered, setIsOrdered] = React.useState(false)
    const [orderId, setOrderId] = React.useState(null)
    const [isLoading, setIsLoading] = React.useState(false)

    // const totalPrice = new Intl.NumberFormat('ru-RU').format(cartItems.reduce((sum, obj) => obj.price + sum, 0));
    const tax = new Intl.NumberFormat('ru-RU').format((cartItems.reduce((sum, obj) => obj.price + sum, 0) * 0.05));


    const closeCart = (event) => {
        if (event.target.classList.contains('overlay')) {
            setCartOpened(false)
        }
    }
    const onDeleteItem = (obj) => {
        onClickDelete(obj)
    }
    const order = async () => {
        try {
            let date = new Date();
            let dd = String(date.getDate()).padStart(2, '0');
            let mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
            let yyyy = date.getFullYear();
            let hours = date.getHours();
            let minutes = date.getMinutes();

            if (minutes < 10) {
                minutes = "0" + minutes;
            }
            date = dd + '/' + mm + '/' + yyyy + ' ' + hours + ':' + minutes;

            setIsLoading(true)
            const { data } = await axios.post('https://6460eb1d185dd9877e333451.mockapi.io/orders', {
                items: cartItems,
                orderDate: date,
                price: totalPrice,
            });
            for (let i = 0; i < cartItems.length; i++) {
                const item = cartItems[i];
                await axios.delete(`https://639862c5044fa481d69b8319.mockapi.io/cart/${item.id}`);
                await delay(1000);
            }

            setOrderId(data.id)
            setCartItems([]);
            setIsOrdered(true);


        }

        catch (error) {
            alert('Ошибка при создании заказа')
        }
        setIsLoading(false)
    }

    return (

        <div className={`overlay ${opened ? 'visible' : ""} `} onClick={closeCart}>
            <div className={`drawer ${opened ? 'visible' : ""} `}>
                <div className="drawer__header">
                    <h2 className="drawer__title">Корзина</h2>
                    <button onClick={() => setCartOpened(false)} className="drawer__header-btn">
                        <img src="images/btn-remove.svg" alt="remove" />
                    </button>
                </div>
                {
                    items.length > 0 ?
                        <div>
                            <div className="cart__items">
                                {
                                    items.map(obj => (
                                        <div className="cart__item">
                                            <img src={obj.imageUrl} alt="sneakers" className="cart__item-img" />
                                            <div className="cart__item-info">
                                                <p className="cart__item-text">{obj.title}</p>
                                                <span className="cart__item-price">{new Intl.NumberFormat('ru-RU').format(obj.price)} руб.</span>
                                            </div>
                                            <button onClick={() => onDeleteItem(obj)} className="cart__item-btn">
                                                <img src="images/btn-remove.svg" alt="remove" />
                                            </button>
                                        </div>
                                    ))

                                }
                            </div>
                            <div className="overlay__footer">
                                <div className="overlay__footer-item">
                                    <span className="overlay__footer-title">Итого: </span>
                                    <span className="overlay__footer-price">{totalPrice} руб. </span>
                                </div>
                                <div className="overlay__footer-item">
                                    <span className="overlay__footer-title">Налог 5%: </span>
                                    <span className="overlay__footer-price">{tax} руб. </span>
                                </div>
                                <button disabled={isLoading} className="overlay__footer-btn" onClick={order}>
                                    <span>
                                        Оформить заказ
                                    </span>
                                </button>
                            </div>
                        </div>
                        :
                        <Info image={isOrdered ? "images/ordered.png" : "images/empty-cart.jpg"} title={isOrdered ? "Заказ выполнен" : "Корзина пустая"} description={isOrdered ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке` : "Добавьте хотя-бы одну пару кроссовок, чтобы сделать заказ."} />
                }

            </div>
        </div>

    )
}

export default Drawer;
