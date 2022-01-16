import React, {FC, useCallback, useEffect} from 'react';
import ModalOverlay from "../modal-overlay/modal-overlay";
import modalStyles from "./modal.module.css"
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import ReactDOM from 'react-dom'

type TModal = {
    title?: string,
    closeModal: () => void
}
const modalRoot = document.getElementById("react-modals");
const Modal: FC<TModal> = ({title = '', closeModal, children}) => {
    const onKeyDown = useCallback(({key}) => {
        if (key === 'Escape') closeModal()
    }, [closeModal])
    useEffect(() => {
        document.addEventListener('keydown', onKeyDown)
        return () => document.removeEventListener('keydown', onKeyDown)
    }, [onKeyDown])
    if (!modalRoot) return (<div></div>)
    return ReactDOM.createPortal(
        <>
            <div className={modalStyles.content + " pt-30"}
                 onClick={(e) => e.stopPropagation()}>
                <p className={modalStyles.title + " text text_type_main-large"}>{title}</p>
                <div className={modalStyles.close_section} onClick={closeModal}>
                    <CloseIcon type="primary"/>
                </div>
                {children}
            </div>
            <ModalOverlay closeModal={closeModal}/>
        </>, modalRoot)
};

export default Modal;

