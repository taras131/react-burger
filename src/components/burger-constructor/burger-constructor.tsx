import React, {FC, useCallback} from 'react';
import constructorStyles from './burger-constructor.module.css'
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
import {getIsAuth} from "../../services/selectors/auth-selectors";
import {useNavigate} from "react-router-dom";
import {ROUTE_LOGIN} from "../../utils/const";
import {RootState} from "../../services/store";
import {IIngredientInCartTypes} from "../../models/i-ingredient-in-cart.types";

const BurgerConstructor: FC = () => {
    const dispatch = useDispatch()
    const cart= useSelector((state: RootState) => getCart(state))
    const bunInCart = useSelector((state: RootState) => getBunInCart(state))
    const notBunIngredients = useSelector((state: RootState) => getNotBunIngredients(state))
    const totalSum = useSelector((state: RootState) => getTotalSum(state))
    const isAuth = useSelector((state: RootState) => getIsAuth(state))
    const navigate = useNavigate()
    const onCreateOrderClick = useCallback(() => {
        if(!isAuth) {
            navigate(ROUTE_LOGIN)
            return
        }
        dispatch(fetchCreateOrder(cart))
    }, [dispatch, cart, isAuth, navigate])
    const [{canDrop}, drop] = useDrop(() => ({
        accept: 'ingredient',
        drop: (item: IIngredientInCartTypes) => {
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
        <section className={constructorStyles.wrapper} ref={drop}>
            <div className={classNames(constructorStyles.order_wrapper, 'mt-25', {
                [constructorStyles.canDrop]: canDrop
            })}>
                {bunInCart && (
                    <div className={constructorStyles.order_item}>
                        <ConstructorElement
                            type="top"
                            isLocked={true}
                            text={bunInCart.name + " (верх)"}
                            price={bunInCart.price}
                            thumbnail={bunInCart.image_mobile}
                        />
                    </div>)}
                <ul className={constructorStyles.order_items}>
                    {constructorItems}
                </ul>
                {bunInCart && (
                    <div className={constructorStyles.order_item}>
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
                    : (<div className={constructorStyles.create_order_section + " pr-4 mt-10"}>
                        <p className="text text_type_digits-default mr-2">{totalSum}</p>
                        <div className={constructorStyles.icon_section + " mr-4"}>
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
