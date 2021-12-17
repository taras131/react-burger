import React, {useCallback} from 'react';
import constructorStyle from './burger-constructor.module.css'
import {Button, ConstructorElement, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {fetchCreateOrder} from "../../services/actions/cart-action-creators";
import {useDispatch, useSelector} from "react-redux";
import {getBunInCart, getCart, getNotBunIngredients, getTotalSum} from "../../services/selectors/cart-selectors";
import {useDrop} from "react-dnd";
import classNames from "classnames";
import ConstructorEmpty from "../constructor-empty/constructor-empty";
import {addToCart} from "../../services/reducers/cart-slice";
import {getUniqueKey} from "../../utils/service";
import ConstructorNotBunIngredient from "../constructor-not-bun-ingredient/constructor-not-bun-ingredient";

const BurgerConstructor = () => {
    const dispatch = useDispatch()
    const cart = useSelector(state => getCart(state))
    const bunInCart = useSelector(state => getBunInCart(state))
    const notBunIngredients = useSelector(state => getNotBunIngredients(state))
    const totalSum = useSelector(state => getTotalSum(state))
    const onCreateOrderClick = useCallback(() => {
        dispatch(fetchCreateOrder(cart))
    }, [dispatch, cart])
    const [{canDrop}, drop] = useDrop(() => ({
        accept: 'ingredient',
        drop: (item) => {
            dispatch(addToCart({...item, key: getUniqueKey()}))
        },
        collect: (monitor) => ({
            canDrop: monitor.canDrop(),
        }),
    }));
    let constructorItems = null
    if (notBunIngredients) {
        constructorItems = notBunIngredients.map((ingredient, index) => (<ConstructorNotBunIngredient
            key={ingredient.key} ingredient={ingredient} index={index}/>))
    }
    return (
        <section className={constructorStyle.wrapper} ref={drop}>
            <div className={classNames(constructorStyle.order_wrapper, 'mt-25', {
                [constructorStyle.canDrop]: canDrop
            })}>
                {bunInCart && (
                    <div className={constructorStyle.order_item}>
                        <ConstructorElement
                            type="top"
                            isLocked={true}
                            text={bunInCart.name + " (верх)"}
                            price={bunInCart.price}
                            thumbnail={bunInCart.image_mobile}
                        />
                    </div>)}
                <ul className={constructorStyle.order_items}>
                    {constructorItems}
                </ul>
                {bunInCart && (
                    <div className={constructorStyle.order_item}>
                        <ConstructorElement
                            type="bottom"
                            isLocked={true}
                            text={bunInCart.name + " (низ)"}
                            price={bunInCart.price}
                            thumbnail={bunInCart.image_mobile}
                        />
                    </div>)}
                {cart.length === 0
                    ? (<ConstructorEmpty/>)
                    : (<div className={constructorStyle.create_order_section + " pr-4 mt-10"}>
                        <p className="text text_type_digits-default mr-2">{totalSum}</p>
                        <div className={constructorStyle.icon_section + " mr-4"}>
                            <CurrencyIcon type="primary"/>
                        </div>
                        <Button type="primary" size="medium"
                                onClick={() => onCreateOrderClick()}>
                            Оформить заказ
                        </Button>
                    </div>)}
            </div>
        </section>
    );
};

export default BurgerConstructor;
