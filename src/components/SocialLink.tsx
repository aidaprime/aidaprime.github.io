import { useState } from 'react';
import styled from 'styled-components';
import { UrlChoiceModal, type UrlChoiceLink } from './UrlChoiceModal';

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

const StyledButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  border-radius: 8px;
  transition: all 0.3s ease;
  color: rgba(255, 255, 255, 0.87);
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;

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
    href?: string;
    links?: UrlChoiceLink[];
}

export const SocialLink = ({ icon, alt, href, links }: SocialLinkProps) => {
    const [modalOpen, setModalOpen] = useState(false);

    if (links && links.length > 0) {
        return (
            <>
                <StyledButton onClick={() => setModalOpen(true)} aria-label={alt}>
                    <img src={icon} alt={alt} />
                </StyledButton>
                <UrlChoiceModal
                    isOpen={modalOpen}
                    onRequestClose={() => setModalOpen(false)}
                    links={links}
                />
            </>
        );
    }

    return (
        <StyledLink href={href} target="_blank" rel="noopener noreferrer" aria-label={alt}>
            <img src={icon} alt={alt} />
        </StyledLink>
    );
};
