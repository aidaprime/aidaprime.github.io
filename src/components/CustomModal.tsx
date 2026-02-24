import { useState, useEffect, useCallback, type ReactNode } from "react";
import Modal from "react-modal";
import styled, { keyframes, css } from "styled-components";

Modal.setAppElement("#root");

const ANIMATION_DURATION = 250;

export interface CustomModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  children: ReactNode;
}

const fadeSlideIn = keyframes`
  from { opacity: 0; transform: translateY(-30px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const fadeSlideOut = keyframes`
  from { opacity: 1; transform: translateY(0); }
  to   { opacity: 0; transform: translateY(-30px); }
`;

const overlayFadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

const overlayFadeOut = keyframes`
  from { opacity: 1; }
  to   { opacity: 0; }
`;

const ModalContent = styled.div<{ $closing: boolean }>`
  position: relative;
  background: #2a2d35;
  border-radius: 12px;
  min-width: 200px;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.15);
  padding: 3rem 2.5rem 1.5rem 2.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  animation: ${({ $closing }) =>
    $closing
      ? css`${fadeSlideOut} ${ANIMATION_DURATION}ms ease forwards`
      : css`${fadeSlideIn} ${ANIMATION_DURATION}ms ease forwards`};
`;

const AnimatedOverlay = styled.div<{ $closing: boolean }>`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${({ $closing }) =>
    $closing
      ? css`${overlayFadeOut} ${ANIMATION_DURATION}ms ease forwards`
      : css`${overlayFadeIn} ${ANIMATION_DURATION}ms ease forwards`};
`;

const CloseButton = styled.button`
  position: absolute;
  padding: 0 0.35em;
  top: 5px;
  right: 5px;
  background: none;
  border: none;
  border-radius: 1em;
  font-size: 1.7rem;
  cursor: pointer;
  color: #888;
  transition: color 0.2s;
  &:hover {
    color: #333;
  }
`;

const reactModalStyles: Modal.Styles = {
  overlay: { backgroundColor: "transparent" },
  content: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    border: "none",
    background: "none",
    padding: 0,
    inset: 0,
  },
};

export const CustomModal = ({ isOpen, onRequestClose, children }: CustomModalProps) => {
  const [showModal, setShowModal] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowModal(true);
      setClosing(false);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setClosing(true);
    setTimeout(() => {
      setShowModal(false);
      setClosing(false);
      onRequestClose();
    }, ANIMATION_DURATION);
  }, [onRequestClose]);

  return (
    <Modal
      isOpen={showModal}
      onRequestClose={handleClose}
      shouldCloseOnOverlayClick={true}
      style={reactModalStyles}
    >
      <AnimatedOverlay $closing={closing} onClick={handleClose}>
        <ModalContent $closing={closing} onClick={(e) => e.stopPropagation()}>
          <CloseButton onClick={handleClose} aria-label="Close">
            &times;
          </CloseButton>
          {children}
        </ModalContent>
      </AnimatedOverlay>
    </Modal>
  );
};
