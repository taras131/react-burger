import React, {FC} from 'react';
import preloaderStyles from './preloader.module.css'
import spinner from '../../images/spinner.gif'

const Preloader: FC = () => {
    return (
        <div className={preloaderStyles.wrapper}>
            <img src={spinner} alt="spinner"/>
        </div>
    );
};

export default Preloader;