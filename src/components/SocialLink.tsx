import styled from 'styled-components';

const StyledLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 8px;
  transition: all 0.3s ease;
  color: rgba(255, 255, 255, 0.87);

  img {
    width: 60px;
    height: 60px;
  }

  &:hover {
    transform: translateY(-4px);
  }
`;

interface SocialLinkProps {
    icon: string;
    alt: string;
    href: string;
}

export const SocialLink = ({ icon, alt, href }: SocialLinkProps) => {
    return (
        <StyledLink href={href} target="_blank" rel="noopener noreferrer" aria-label={alt}>
            <img src={icon} alt={alt} />
        </StyledLink>
    );
};
