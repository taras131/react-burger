import React from 'react';
import emptyStyles from './constructor-empty.module.css'
import emptyCart from '../../images/empty-cart.png'

const ConstructorEmpty = () => {
    return (
        <div className={emptyStyles.wrapper}>
            <img src={emptyCart} alt="empty-cart"/>
            <p className="text text_type_digits-default mt-10">
                Ваш коструктор пока пуст :( , перетащите ингридиенты из списка слева.
            </p>
        </div>
    );
};

export default ConstructorEmpty;