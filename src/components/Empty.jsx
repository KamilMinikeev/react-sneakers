import React from 'react'

import { Link } from "react-router-dom";

const Empty = ({ title, description, image }) => {
    return (
        <div className="empty">
            <img src={image} alt="" className="empty__img" />
            <h2 className="empty__title">{title}</h2>
            <p className="empty__text">{description}</p>
            <Link to="/">
                <button className="empty__btn button">
                    <span>Вернуться назад</span>
                </button>
            </Link>

        </div>
    )
}

export default Empty;
