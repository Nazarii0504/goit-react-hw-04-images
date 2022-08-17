import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { ModalOverlay, ModalWindow } from './Modal.styled';

const portal = document.querySelector('#modal-root');

export const Modal = ({ onClose, activeimageURL }) => {
  useEffect(() => {
    const handleKeydown = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, [onClose]);

  const handleBackdrop = e => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <ModalOverlay onClick={handleBackdrop}>
      <ModalWindow>
        <img src={activeimageURL} alt="modal url" />
      </ModalWindow>
    </ModalOverlay>,
    portal
  );
};
PropTypes.Modal = {
  onClose: PropTypes.func,
  activeimageURL: PropTypes.string,
};
