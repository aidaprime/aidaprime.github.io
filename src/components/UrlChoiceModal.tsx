import styled from "styled-components";
import { CustomModal } from "./CustomModal";

export interface UrlChoiceLink {
  label: string;
  url: string;
}

export interface UrlChoiceModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  links: UrlChoiceLink[];
}

const LinkItem = styled.a`
  display: block;
  width: 100%;
  text-align: center;
  padding: 0.6rem 1rem;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.87);
  text-decoration: none;
  font-weight: 500;
  transition: background 0.2s;
  &:hover {
    background: rgba(255, 255, 255, 0.15);
    color: #fff;
  }
`;

export const UrlChoiceModal = ({ isOpen, onRequestClose, links }: UrlChoiceModalProps) => {
  return (
    <CustomModal isOpen={isOpen} onRequestClose={onRequestClose}>
      {links.map((link) => (
        <LinkItem key={link.url} href={link.url} target="_blank" rel="noopener noreferrer">
          {link.label}
        </LinkItem>
      ))}
    </CustomModal>
  );
};
