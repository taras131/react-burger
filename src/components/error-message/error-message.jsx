import React from 'react';
import errorStyles from './error-message.module.css'
import antenna from '../../images/antenna.png'

const ErrorMessage = () => {
    return (
        <div className={errorStyles.wrapper}>
            <img src={antenna} alt="antenna"/>
            <p className="text text_type_main-large mt-10">
                Произошёл обрыв связи с сервером, наши инженеры уже производят ремонт антенн
            </p>
            <p className="text text_type_main-medium mt-10">
                Попробуте повторить попытку соединения позднее.
            </p>
        </div>
    );
};

export default ErrorMessage;