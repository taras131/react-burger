import React, {useEffect} from 'react';
import ModalOverlay from "../modal-overlay/modal-overlay";
import modalStyles from "./modal.module.css"
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import ReactDOM from 'react-dom'
import PropTypes from "prop-types";

const modalRoot = document.getElementById("react-modals");

const Modal = ({title = '', closeModal, children}) => {
    const onKeyDown = ({key}) => {
        if (key === 'Escape') closeModal()
    }
    useEffect(() => {
        document.addEventListener('keydown', onKeyDown)
        return () => document.removeEventListener('keydown', onKeyDown)
    }, [])
    return ReactDOM.createPortal(
        <>
            <div className={modalStyles.content + " pt-30"}
                 onClick={(e) => e.stopPropagation()}>
                <p className={modalStyles.title + " text text_type_main-large"}>{title}</p>
                <div className={modalStyles.close_section} onClick={() => closeModal()}>
                    <CloseIcon type="primary"/>
                </div>
                {children}

            </div>
            <ModalOverlay closeModal={closeModal}/>
        </>, modalRoot)
};
Modal.propTypes = {
    closeModal: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired,
    title: PropTypes.string
}

export default Modal;

