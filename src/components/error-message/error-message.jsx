import React from 'react';
import errorStyles from './error-message.module.css'
import antenna from '../../images/antenna.png'
import PropTypes from "prop-types";

const ErrorMessage = ({errorMessage}) => {
    return (
        <div className={errorStyles.wrapper}>
            <img src={antenna} alt="antenna"/>
            <p className="text text_type_main-large mt-10">
                {errorMessage}
            </p>
            <p className="text text_type_main-medium mt-10">
                Попробуте повторить попытку позднее.
            </p>
        </div>
    );
};

ErrorMessage.propTypes={
    errorMessage: PropTypes.string.isRequired,
}

export default ErrorMessage;