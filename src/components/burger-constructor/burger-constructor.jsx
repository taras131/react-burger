import React, {useEffect} from 'react';
import constructorStyle from './burger-constructor.module.css'
import {Button, ConstructorElement, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useAppDispatch} from "../../hooks/redux";
import {fetchCreateOrder} from "../../services/actions/cart-action-creators";
import {useSelector} from "react-redux";
import {getBunInCart, getCart, getFillingsInCart, getTotalSum} from "../../services/selectors/cart-selector";
import {getIngredientsByType} from "../../services/selectors/ingredients-selectors";
import {addToCart} from '../../services/reducers/cart-slice'
import {useDrop} from "react-dnd";
import ConstructorFillingItem from "../constructor-filling-item/constructor-filling-item";
import classNames from "classnames";

const BurgerConstructor = () => {
    const dispatch = useAppDispatch()
    const cart = useSelector(state => getCart(state))
    const bunInCart = useSelector(state => getBunInCart(state))
    const fillingsInCart = useSelector(state => getFillingsInCart(state))
    const buns = useSelector(state => getIngredientsByType(state, 'bun'))
    const totalSum = useSelector(state => getTotalSum(state))
    useEffect(() => {
        if (cart.length === 0 && buns.length > 0) {
            dispatch(addToCart(buns[0]))
        }
    }, [buns])
    const onCreateOrderClick = () => {
        dispatch(fetchCreateOrder(cart))
    }
    const [{canDrop}, drop] = useDrop(() => ({
        accept: 'ingredient',
        drop: () => ({name: 'Dustbin'}),
        collect: (monitor) => ({
            canDrop: monitor.canDrop(),
        }),
    }));
    const constructorItems = fillingsInCart.map((item, index) => (<ConstructorFillingItem
        key={item.key} item={item} index={index}/>))
    return (
        <section className={constructorStyle.wrapper} ref={drop} role={'Dustbin'}>
            <div className={classNames(constructorStyle.order_wrapper, 'mt-25', {
                [constructorStyle.canDrop]: canDrop
            })}>
                {bunInCart && (<>
                    <div className={constructorStyle.order_item}>
                        <ConstructorElement
                            type="top"
                            isLocked={true}
                            text={bunInCart.name + " (верх)"}
                            price={bunInCart.price}
                            thumbnail={bunInCart.image_mobile}
                        />
                    </div>
                    <ul className={constructorStyle.order_items}>
                        {constructorItems}
                    </ul>
                    <div className={constructorStyle.order_item}>
                        <ConstructorElement
                            type="bottom"
                            isLocked={true}
                            text={bunInCart.name + " (низ)"}
                            price={bunInCart.price}
                            thumbnail={bunInCart.image_mobile}
                        />
                    </div>
                    <div className={constructorStyle.create_order_section + " pr-4 mt-10"}>
                        <p className="text text_type_digits-default mr-2">{totalSum}</p>
                        <div className={constructorStyle.icon_section + " mr-4"}>
                            <CurrencyIcon type="primary"/>
                        </div>
                        <Button type="primary" size="medium"
                                onClick={() => onCreateOrderClick()}>
                            Оформить заказ
                        </Button>
                    </div>
                </>)
                }
            </div>
        </section>
    );
};

export default BurgerConstructor;
