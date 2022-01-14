import React from 'react';
import notFoundPageStyles from './not-found-page.module.css'
import blackHole from '../../images/black-hole.jpg'

const NotFoundPage = () => {
    return (
        <div className={notFoundPageStyles.wrapper}>
            <img className={notFoundPageStyles.black_hole} src={blackHole} alt="error 404"/>
            <div className={notFoundPageStyles.description}>
                <p className="text text_type_main-large">Страница не найдена</p>
                <p className="text text_type_main-medium mt-10">
                    Возможно , судьба её печальна....
                </p>
            </div>

        </div>
    );
};

export default NotFoundPage;