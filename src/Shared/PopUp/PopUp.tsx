import React from "react";
import '../../Icons/icomoon.css';

interface Props {
    isOpen: boolean;
    onClose : () => void;
    children: React.ReactNode;
    width: string;
    height: string;
    showCloseIcon? : true;
}

const PopUp = (props: Props) => {
    const {isOpen, onClose, children, width, height, showCloseIcon = true} = props;
    if(!isOpen) {
        return null;
    }

    return (
        <div className="popup-overlay">
            <div className="popup-container" style={{width, height}}>
                {showCloseIcon && <span onClick={onClose} className="icon-close-outline"/>}
                <div className="popup-content">{children}</div>
            </div>
        </div>
    )
};


export default PopUp;