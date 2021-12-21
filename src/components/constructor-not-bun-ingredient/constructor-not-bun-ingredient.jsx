import React, {useCallback, useRef} from 'react';
import fillingStyles from "./constructor-not-bun-ingredient.module.css";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDrag, useDrop} from "react-dnd";
import {removeFromCart, moveConstructorItem} from "../../services/reducers/cart-slice";
import PropTypes from "prop-types";
import Modal from "../modal/modal";
import {ingredientInCartPropTypes} from "../../types";
import {useDispatch} from "react-redux";

const ConstructorNotBunIngredient = ({ingredient, index}) => {
    const ref = useRef(null)
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
        hover: (item, monitor) => {
            const dragIndex = item.index
            const hoverIndex = index
            if (dragIndex === hoverIndex) {
                return;
            }
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
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
    const opacity = isDragging ? 0.01 : 1
    return (
        <li className={fillingStyles.filling_item + " pr-2"} ref={ref} style={{opacity}}>
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

Modal.ConstructorFillingItem = {
    item: ingredientInCartPropTypes.isRequired,
    index: PropTypes.number.isRequired,
}

export default ConstructorNotBunIngredient;