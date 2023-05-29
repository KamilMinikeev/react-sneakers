import React from 'react';
import Card from '../components/Card';
import Empty from '../components/Empty';

import { AppContext } from '../context';

function Favorites() {

    const { favorites, onAddToFavorite } = React.useContext(AppContext)

    return (
        <div className="content">
            <div className="content__header">
                <h1>Мои закладки</h1>

            </div>
            {
                favorites.length > 0 ?
                    <div className="cards">
                        {
                            favorites.map((obj, index) => (
                                <Card
                                    key={index}
                                    title={obj.title}
                                    price={obj.price}
                                    imageUrl={obj.imageUrl}
                                    favorited={true}
                                    onClickFavorite={() => onAddToFavorite(obj)}
                                />
                            ))
                        }
                    </div> :
                    <Empty
                        title={'Закладок нет :('}
                        description={'Вы ничего не добавляли в закладки'}
                        image={"/images/icon2.png"}
                    />
            }



        </div>
    );
}


export default Favorites;
