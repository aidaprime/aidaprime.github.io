import styled from "styled-components";
import { CustomModal } from "./CustomModal";
import { GALLERY_IMAGES } from "../constants";

const FullImage = styled.img`
  max-width: 90vw;
  max-height: 80vh;
  border-radius: 12px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.25);
  background: #222;
`;

interface GalleryViewerProps {
  openIndex: number | null;
  onClose: () => void;
}

export const GalleryViewer = ({ openIndex, onClose }: GalleryViewerProps) => {
  const isOpen = openIndex !== null && openIndex >= 0 && openIndex < GALLERY_IMAGES.length;
  return (
    <CustomModal isOpen={isOpen} onRequestClose={onClose} padding="40px 10px 10px 10px">
      {isOpen && (
        <FullImage src={GALLERY_IMAGES[openIndex!]} alt={`Gallery full ${openIndex! + 1}`} />
      )}
    </CustomModal>
  );
};
