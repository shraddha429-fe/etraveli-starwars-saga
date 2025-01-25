import React from 'react';
import '../../../Icons/icomoon.css';
import './PopUp.css';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  width: string;
  height: string;
  showCloseIcon?: true;
}

const PopUp = (props: Props) => {
  const {
    isOpen,
    onClose,
    children,
    width = '90%',
    height = 'auto',
    showCloseIcon = true,
  } = props;
  if (!isOpen) {
    return null;
  }

  return (
    <div className="backdrop">
      <div className="popup-overlay">
        <div className="popup-container" style={{ width, height }}>
          {showCloseIcon && (
            <span onClick={onClose} className="icon-close-outline icon-red" />
          )}
          <div className="popup-content">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default PopUp;
