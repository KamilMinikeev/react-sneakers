import React from 'react';
import axios from 'axios';


import Order from '../components/Order';
import Empty from '../components/Empty';

function Orders() {

    const [orders, setOrders] = React.useState([])

    React.useEffect(() => {

        async function fetchData() {
            try {
                const { data } = await axios.get('https://6460eb1d185dd9877e333451.mockapi.io/orders');
                // console.log(data.map((obj) => obj.items).flat())
                // console.log(data.reduce((prev, obj) => [...prev, ...obj.items], []))
                setOrders(data)

                //setOrderId(data.reduce((prev, obj) => [...prev, ...obj.id], []))
                //setOrdersItems(data.reduce((prev, obj) => [...prev, ...obj.items], []))

            }
            catch (error) {
                alert('Произошла ошибка при запросе заказов');
                console.error(error)
            }


        }
        fetchData()

    }, [])

    return (
        <div className="content">
            <div className="content__header">
                <h1>Мои покупки</h1>

            </div>

            {
                orders.length > 0 ?
                    <div className="orders">
                        {
                            orders.map((obj) => (
                                <Order orderId={obj.id} order={obj.items} date={obj.orderDate} price={obj.price} />
                            ))
                        }
                    </div> :
                    <Empty
                        title={'У вас нет заказов'}
                        description={'Оформите хотя бы один заказ.'}
                        image={"images/icon1.png"}
                    />
            }



        </div>
    );
}


export default Orders;
