import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 300px;
`;

const SpinnerRing = styled.div`
  width: 48px;
  height: 48px;
  border: 4px solid rgba(255, 255, 255, 0.1);
  border-top-color: rgba(255, 255, 255, 0.87);
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;

export const LoadingSpinner = () => {
  return (
    <SpinnerContainer>
      <SpinnerRing />
    </SpinnerContainer>
  );
};
