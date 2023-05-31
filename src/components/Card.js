import React from 'react';
import { AppContext } from '../context';

import ContentLoader from "react-content-loader"


function Card({ onClickPlus, onClickFavorite, cardId, title, price, imageUrl, favorited = false, loading = false }) {

    const { isItemAdded } = React.useContext(AppContext)
    const { isItemFavorite } = React.useContext(AppContext)


    // const [isAdded, setIsAdded] = React.useState(added);
    // const [isFavorite, setIsFavorite] = React.useState(favorited);

    const plus = () => {
        //setIsAdded(!isAdded);
        onClickPlus();
    }
    const favorite = () => {
        //setIsFavorite(!isFavorite);
        onClickFavorite();
    }

    return (
        <div className="card">
            {
                loading ?
                    <ContentLoader
                        speed={2}
                        width={150}
                        height={260}
                        viewBox="0 0 150 260"
                        backgroundColor="#f3f3f3"
                        foregroundColor="#ecebeb"

                    >
                        <rect x="106" y="-65" rx="3" ry="3" width="88" height="6" />
                        <rect x="158" y="-198" rx="3" ry="3" width="52" height="6" />
                        <rect x="82" y="-79" rx="3" ry="3" width="410" height="6" />
                        <rect x="162" y="-128" rx="3" ry="3" width="380" height="6" />
                        <rect x="112" y="-80" rx="3" ry="3" width="178" height="6" />
                        <circle cx="153" cy="-105" r="20" />
                        <rect x="231" y="-112" rx="0" ry="0" width="23" height="30" />
                        <rect x="0" y="0" rx="0" ry="0" width="150" height="91" />
                        <rect x="0" y="101" rx="0" ry="0" width="150" height="15" />
                        <rect x="0" y="129" rx="0" ry="0" width="93" height="15" />
                        <rect x="0" y="172" rx="0" ry="0" width="80" height="24" />
                        <rect x="122" y="164" rx="0" ry="0" width="32" height="32" />
                    </ContentLoader> :

                    <>
                        {onClickFavorite &&
                            <div className="favorite" onClick={() => favorite()}>
                                {
                                    favorited ? <img src="images/heart-liked.svg" alt="unliliked" className="card__like-img" /> :
                                        <img src={isItemFavorite(cardId) ? 'images/heart-liked.svg' : 'images/heart-not-liked.svg'} alt="unliliked" className="card__like-img" />
                                }

                            </div>}
                        <img src={imageUrl} alt="sneakers" className="card__img" />
                        <p className="card__text">
                            {title}
                        </p>
                        <div className="card__info">
                            <div className="card__price">
                                <span className="card__price-title">Цена:</span>
                                <b className="card__price-value">{new Intl.NumberFormat('ru-RU').format(parseInt(String(price).replace(/ /g, '')))} руб.</b>
                            </div>
                            {onClickPlus &&
                                <button className="card__btn" onClick={plus}>
                                    <img src={isItemAdded(cardId) ? "images/btn-checked.svg" : "images/btn-plus.svg"} alt="Plus" />
                                </button>}
                        </div>
                    </>
            }
        </div >
    )
}

export default Card;

