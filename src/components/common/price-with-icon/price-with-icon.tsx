import React, {FC} from 'react';
import priceWithIconStyles from './price-with-icon.module.css';
import {CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";

interface IPriceWithIcon {
    price: number
}

const PriceWithIcon: FC<IPriceWithIcon> = ({price}) => {
    return (
        <div className={priceWithIconStyles.wrapper}>
            <p className="text text_type_digits-default">{price}</p>
            <CurrencyIcon type="primary"/>
        </div>
    );
};

export default PriceWithIcon;