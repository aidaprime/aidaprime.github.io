import { useState } from 'react';
import styled from 'styled-components';
import { GALLERY_PREVIEW_IMAGES } from '../constants';
import { LoadingSpinner } from './LoadingSpinner';
import { GalleryViewer } from './GalleryViewer';

const Container = styled.div`
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 12px;
  margin: 0 0 32px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
`;

const Overlay = styled.div<{ $isLoading: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: ${props => (props.$isLoading ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
  background-color: rgba(49, 20, 66, 0.8);
  border-radius: 12px;
  z-index: 10;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  max-width: 420px;
  margin: 0 auto;
`;

const ImageItem = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 8px;
  object-fit: cover;
  aspect-ratio: 1;
  cursor: pointer;
  transition: transform 0.3s ease, filter 0.3s ease;

  &:hover {
    transform: scale(1.05);
    filter: brightness(1.1);
  }
`;

const Title = styled.h2`
  font-size: 3em;
  margin: 0 0 8px 0;
  text-align: left;
`;

export const GalleryBox = () => {
  const [loadedCount, setLoadedCount] = useState(0);
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);
  const allLoaded = loadedCount >= GALLERY_PREVIEW_IMAGES.length;

  const handleImageLoad = () => {
    setLoadedCount(prev => prev + 1);
  };

  return (
    <>
      <Title>Gallery</Title>
      <Container>
      <Grid>
        {GALLERY_PREVIEW_IMAGES.map((image, index) => (
          <ImageItem
            key={index}
            src={image}
            alt={`Gallery preview ${index + 1}`}
            onLoad={handleImageLoad}
            onClick={() => setViewerIndex(index)}
          />
        ))}
      </Grid>
      <Overlay $isLoading={!allLoaded}>
        <LoadingSpinner />
      </Overlay>
      </Container>
      <GalleryViewer openIndex={viewerIndex} onClose={() => setViewerIndex(null)} />
    </>
  );
};
