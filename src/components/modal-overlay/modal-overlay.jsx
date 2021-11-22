import React from 'react';
import overlayStyles from './modal-overlay.module.css';
import PropTypes from "prop-types";

const ModalOverlay = ({closeModal}) => {
    return (
        <div className={overlayStyles.wrapper}
             onClick={() => closeModal()}>

        </div>
    );
};

ModalOverlay.propTypes = {
    closeModal: PropTypes.func.isRequired,
}

export default ModalOverlay;