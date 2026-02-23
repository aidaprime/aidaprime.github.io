import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  justify-content: center;
  align-items: center;
  margin-top: 24px;
  margin-bottom: 48px;
`;

const Title = styled.h2`
  font-size: 2.3em;
  margin: 0;
`;

const ChildrenWrapper = styled.div`
  display: flex;
  gap: 16px;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

interface SocialsBlockProps {
  children?: React.ReactNode;
}

export const SocialsBlock = ({ children }: SocialsBlockProps) => {
  return (
    <Container>
      <Title>For Partnerships 🤝🏻:</Title>
      <ChildrenWrapper>{children}</ChildrenWrapper>
    </Container>
  );
};

