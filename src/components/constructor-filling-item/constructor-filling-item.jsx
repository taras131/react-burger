import React, {useRef} from 'react';
import fillingStyle from "./constructor-filling-item.module.css";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDrag, useDrop} from "react-dnd";
import {removeFromCart, moveConstructorItem} from "../../services/reducers/cart-slice";
import {useAppDispatch} from "../../hooks/redux";
import PropTypes from "prop-types";
import Modal from "../modal/modal";
import {ingredientInCartPropTypes} from "../../types";

const ConstructorFillingItem = ({item, index}) => {
    const ref = useRef(null)
    const dispatch = useAppDispatch()
    const onRemoveItemClick = (key) => {
        dispatch(removeFromCart(key))
    }
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
            dispatch(moveConstructorItem({drag: dragIndex + 1, hover: hoverIndex + 1}))
            item.index = hoverIndex;
        }
    })
    drag(drop(ref))
    const opacity = isDragging ? 0.01 : 1
    return (
        <li className={fillingStyle.filling_item + " pr-2"} ref={ref} style={{opacity}}>
            <DragIcon type="primary"/>
            <ConstructorElement
                text={item.name}
                price={item.price}
                thumbnail={item.image_mobile}
                handleClose={() => onRemoveItemClick(item.key)}
            />
        </li>
    );
};

Modal.ConstructorFillingItem = {
    item: ingredientInCartPropTypes.isRequired,
    index: PropTypes.number.isRequired,
}

export default ConstructorFillingItem;