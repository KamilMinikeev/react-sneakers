import React from 'react';

import Card from '../components/Card';

function Home({ items, searchValue, setSearchValue, onChangeSearchInput, onCart, onAddToFavorite, isLoading }) {

    const renderItems = () => {
        const filtredItems = items.filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase()));
        return (isLoading ? Array(8).fill({}) : filtredItems).map((obj, index) => (
            <Card
                key={index}
                title={obj.title}
                price={obj.price}
                cardId={obj.cardId}
                imageUrl={obj.imageUrl}
                onClickPlus={() => onCart(obj)}
                onClickFavorite={() => onAddToFavorite(obj)}
                // added={cartItems.some(cartObj => Number(cartObj.cardId) === Number(obj.cardId))}
                // added={isItemAdded(obj.cardId)}
                loading={isLoading}
            />
        ))
    }

    return (
        <div className="content">
            <div className="content__header">
                <h1>{searchValue ? `Поиск по запросу "${searchValue}"` : 'Все кроссовки'}</h1>
                <div className='input-inner'>
                    <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск..." />
                    <button onClick={() => setSearchValue('')} className="content__header-remove">
                        <img src="/images/btn-remove.svg" alt="remove" />
                    </button>
                </div>

            </div>

            <div className="cards">
                {
                    renderItems()
                }
            </div>

        </div>
    );
}


export default Home;
