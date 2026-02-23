import { useState } from 'react';
import styled from 'styled-components';
import { MEDIUM_RESOLUTION, SMALL_RESOLUTION } from '../constants';

const StyledPicture = styled.picture<{ $isLoaded: boolean; $isBlur?: boolean }>`
  position: fixed;
  inset: 0;
  z-index: ${props => (props.$isBlur ? -2 : -1)};
  pointer-events: none;
  opacity: ${props => {
    if (props.$isBlur) return props.$isLoaded ? 0 : 1;
    return props.$isLoaded ? 1 : 0;
  }};
  filter: ${props => (props.$isBlur ? 'blur(20px)' : 'none')};
  transition: opacity 0.8s ease-in-out, filter 1.2s ease-in-out;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
`;

export const SiteBackgroundImage = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      <StyledPicture $isLoaded={isLoaded} $isBlur>
        <source
          media={`(min-width: ${SMALL_RESOLUTION + 1}px)`}
          srcSet="/blurred-bg.jpg"
        />
        <img src="/blurred-bg-mobile.jpg" alt="" />
      </StyledPicture>

      <StyledPicture $isLoaded={isLoaded}>
        <source
          media={`(min-width: ${MEDIUM_RESOLUTION + 1}px)`}
          srcSet="/background-large.jpg"
        />
        <source
          media={`(min-width: ${SMALL_RESOLUTION + 1}px)`}
          srcSet="/background-medium.jpg"
        />
        <img
          src="/background-small.jpg"
          onLoad={() => setIsLoaded(true)}
          alt=""
        />
      </StyledPicture>
    </>
  );
};
