import React from 'react'
import Card from './Card'

function Order({ orderId, order = [], date, price }) {

    return (
        <div className='orders__item'>
            <h1 className='orders__title'>Заказ #{orderId}</h1>
            <span className='orders__date'>Дата заказа: {date}</span>
            <span className='orders__price'>Стоимость: {price} руб.</span>
            <div className='cards'>
                {
                    order.map((obj, index) => (
                        <Card
                            key={index}
                            title={obj.title}
                            price={obj.price}
                            cardId={obj.cardId}
                            imageUrl={obj.imageUrl}
                        />)
                    )
                }
            </div>
        </div>
    )
}

export default Order;
