import React from 'react';
import overlayStyles from './modal-overlay.module.css'
import PropTypes from "prop-types";

const ModalOverlay = ({children, closeModal}) => {
    return (
        <div className={overlayStyles.wrapper}
             onClick={() => closeModal()}>
            {children}
        </div>
    );
};

ModalOverlay.propTypes = {
    closeModal: PropTypes.func.isRequired,
    children: PropTypes.element.isRequired
}

export default ModalOverlay;