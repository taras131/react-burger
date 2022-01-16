import React, {FC} from 'react';
import errorStyles from './error-message.module.css'
import antenna from '../../images/antenna.png'

type TErrorMessage = {
    errorMessage: string
}
const ErrorMessage: FC<TErrorMessage> = ({errorMessage}) => {
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

export default ErrorMessage;