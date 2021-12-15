import React from 'react';
import overlayStyles from './modal-overlay.module.css';
import PropTypes from "prop-types";

const ModalOverlay = ({closeModal}) => {
    const closeClick = (e) => {
        e.stopPropagation()
        closeModal()
    }
    return (
        <div className={overlayStyles.wrapper}
             onClick={closeClick}>
        </div>
    );
};

ModalOverlay.propTypes = {
    closeModal: PropTypes.func.isRequired,
}

export default ModalOverlay;