import React, {FC} from 'react';
import overlayStyles from './modal-overlay.module.css';

type TModalOverlay = {
    closeModal: () => void
}
const ModalOverlay: FC<TModalOverlay> = ({closeModal}) => {
    const closeClick = (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation()
        closeModal()
    }
    return (
        <div className={overlayStyles.wrapper}
             onClick={closeClick}>
        </div>
    );
};

export default ModalOverlay;