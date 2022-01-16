import React, {FC, useCallback, useRef} from 'react';
import fillingStyles from "./constructor-not-bun-ingredient.module.css";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {DropTargetMonitor, useDrag, useDrop, XYCoord} from "react-dnd";
import {removeFromCart, moveConstructorItem} from "../../services/reducers/cart-slice";
import {useDispatch} from "react-redux";
import {IIngredientInCartTypes} from "../../models/i-ingredient-in-cart.types";
import classNames from "classnames";

type TConstructorNotBunIngredient = {
    ingredient: IIngredientInCartTypes,
    index: number
}

interface DragItem {
    index: number
    id: string
    type: string
}

const ConstructorNotBunIngredient: FC<TConstructorNotBunIngredient> =
    ({ingredient, index}) => {
        const ref = useRef<HTMLLIElement>(null)
        const dispatch = useDispatch()
        const onRemoveItemClick = useCallback((key) => {
            return () => dispatch(removeFromCart(key));
        }, [dispatch]);
        const [{isDragging}, drag] = useDrag({
            type: "filling",
            item: () => {
                return {index}
            },
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
            })
        })
        const [, drop] = useDrop({
            accept: "filling",
            collect: (monitor) => ({
                canDrop: monitor.canDrop(),
            }),
            hover: (item: DragItem, monitor: DropTargetMonitor) => {
                if (!ref.current) {
                    return
                }
                const dragIndex = item.index
                const hoverIndex = index
                if (dragIndex === hoverIndex) {
                    return;
                }
                const hoverBoundingRect = ref.current?.getBoundingClientRect();
                const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
                const clientOffset = monitor.getClientOffset();
                const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top
                if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                    return;
                }
                if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                    return;
                }
                dispatch(moveConstructorItem({drag: dragIndex, hover: hoverIndex}))
                item.index = hoverIndex;
            }
        })
        drag(drop(ref))
        return (
            <li className={classNames(fillingStyles.filling_item, {
                [fillingStyles.drag]: isDragging
            })} ref={ref}>
                <DragIcon type="primary"/>
                <ConstructorElement
                    text={ingredient.name}
                    price={ingredient.price}
                    thumbnail={ingredient.image_mobile}
                    handleClose={onRemoveItemClick(ingredient.key)}
                />
            </li>
        );
    };

export default ConstructorNotBunIngredient;