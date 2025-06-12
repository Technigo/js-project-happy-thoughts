import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import Button from './Button';
import { device } from '../styles/media';
import { colors, colorCombos } from '../styles/colors';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${colors.overlay.backdrop};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`;

const Dialog = styled.div`
  background: ${colors.background.white};
  border: 2px solid ${colors.border.main};
  box-shadow: ${colors.overlay.modalShadow};
  border-radius: 8px;
  padding: 30px;
  max-width: 400px;
  width: 100%;
  animation: slideIn 0.2s ease-out;

  @media ${device.mobile} {
    padding: 20px;
    margin: 20px;
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Title = styled.h3`
  margin: 0 0 15px 0;
  color: ${colors.text.primary};
  font-size: 1.2rem;
  text-align: center;

  @media ${device.smallMobile} {
    font-size: 1.1rem;
  }
`;

const Message = styled.p`
  margin: 0 0 25px 0;
  color: ${colors.text.secondary};
  line-height: 1.5;
  text-align: center;

  @media ${device.smallMobile} {
    font-size: 0.95rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;

  @media ${device.smallMobile} {
    flex-direction: column;
    gap: 8px;
  }
`;

const CancelButton = styled(Button)`
  background: ${colorCombos.cancelButton.background};
  color: ${colorCombos.cancelButton.color};
  border: ${colorCombos.cancelButton.border};

  &:hover:not(:disabled) {
    background: ${colorCombos.cancelButton.hoverBackground};
    color: ${colorCombos.cancelButton.hoverColor};
  }
`;

const ConfirmButton = styled(Button)`
  background: ${colorCombos.deleteButton.background};
  color: ${colorCombos.deleteButton.color};
  border: ${colorCombos.deleteButton.border};

  &:hover:not(:disabled) {
    background: ${colorCombos.deleteButton.hoverBackground};
  }
`;

/**
 * Custom confirmation dialog component to replace browser alerts
 */
const ConfirmDialog = ({ 
  isOpen, 
  title = "Confirm Action", 
  message, 
  confirmText = "Confirm", 
  cancelText = "Cancel",
  onConfirm, 
  onCancel,
  isLoading = false
}) => {
  const dialogRef = useRef(null);
  const firstButtonRef = useRef(null);

  // Focus trap
  useEffect(() => {
    if (isOpen && dialogRef.current) {
      // Focus the first button
      firstButtonRef.current?.focus();
      const focusable = dialogRef.current.querySelectorAll('button, [tabindex]:not([tabindex="-1"])');
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      function handleKeyDown(e) {
        if (e.key === 'Tab') {
          if (e.shiftKey) {
            if (document.activeElement === first) {
              e.preventDefault();
              last.focus();
            }
          } else {
            if (document.activeElement === last) {
              e.preventDefault();
              first.focus();
            }
          }
        } else if (e.key === 'Escape') {
          e.preventDefault();
          onCancel && onCancel();
        }
      }
      dialogRef.current.addEventListener('keydown', handleKeyDown);
      return () => dialogRef.current.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onCancel && onCancel();
    }
  };

  return (
    <Overlay onClick={handleOverlayClick}>
      <Dialog ref={dialogRef} aria-modal="true" role="dialog" aria-labelledby="dialog-title" aria-describedby="dialog-message">
        <Title id="dialog-title">{title}</Title>
        <Message id="dialog-message">{message}</Message>
        <ButtonContainer>
          <CancelButton 
            ref={firstButtonRef}
            onClick={() => onCancel && onCancel()} 
            disabled={isLoading}
            aria-label="Cancel"
          >
            {cancelText}
          </CancelButton>
          <ConfirmButton 
            onClick={() => onConfirm && onConfirm()} 
            disabled={isLoading}
            aria-label="Confirm"
          >
            {isLoading ? 'Processing...' : confirmText}
          </ConfirmButton>
        </ButtonContainer>
      </Dialog>
    </Overlay>
  );
};

export default ConfirmDialog; 