import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import { CustomModal } from "./CustomModal";
import { GALLERY_IMAGES } from "../constants";
import { LoadingSpinner } from "./LoadingSpinner";

const FullImage = styled.img`
  max-width: 90vw;
  max-height: 80vh;
  border-radius: 12px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.25);
  background: #222;
`;

const SpinnerWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 300px;
  min-height: 300px;
`;

interface GalleryViewerProps {
  openIndex: number | null;
  onClose: () => void;
}

export const GalleryViewer = ({ openIndex, onClose }: GalleryViewerProps) => {
  const isOpen = openIndex !== null && openIndex >= 0 && openIndex < GALLERY_IMAGES.length;
  const [loading, setLoading] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    if (isOpen && openIndex !== null) {
      setLoading(true);
      const img = imgRef.current;
      if (img && img.complete) {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, [openIndex, isOpen]);

  return (
    <CustomModal isOpen={isOpen} onRequestClose={onClose} padding="40px 10px 10px 10px">
      {isOpen && (
        <>
          {loading && (
            <SpinnerWrapper>
              <LoadingSpinner />
            </SpinnerWrapper>
          )}
          <FullImage
            ref={imgRef}
            src={GALLERY_IMAGES[openIndex!]}
            alt={`Gallery full ${openIndex! + 1}`}
            style={{ display: loading ? 'none' : 'block' }}
            onLoad={() => setLoading(false)}
          />
        </>
      )}
    </CustomModal>
  );
};
