import React, { HtmlHTMLAttributes, useEffect, useRef } from 'react';
import styled, { css } from 'styled-components';

const modalPadding = css`
  padding: ${(props) => props.theme.innerSpacing.medium} ${(props) => props.theme.innerSpacing.large};
`;

export const ModalTitle = styled.h3`
  margin: ${(props) => props.theme.outerSpacing.tiny} 0;
`;

export const ModalTitleSub = styled.span`
  font-size: 0.85rem;
  color: ${(props) => props.theme.colours.darkGrey};
  margin-bottom: ${(props) => props.theme.outerSpacing.small};
`;

const ModalHeader = styled.header`
  ${modalPadding};
  display: flex;
  align-items: center;
`;

const ModalBody = styled.section`
  ${modalPadding};
  flex-grow: 1;
`;

const ModalFooter = styled.footer`
  ${modalPadding};
  display: flex;
  justify-content: space-between;
  border-top: 1px ${(props) => props.theme.colours.grey} solid;
`;

export { ModalHeader, ModalBody, ModalFooter };

const Background = styled.div`
  position: fixed;
  inset: 0;
  background-color: ${(props) => props.theme.colours.modalBackground};
`;

const ModalContainer = styled.div<{size: 'small'}>`
  position: absolute;
  inset: 0;
  margin: auto;
  width: fit-content;
  height: fit-content;
  background-color: ${(props) => props.theme.colours.lightGrey};
  display: flex;
  flex-direction: column;
  border-radius: ${(props) => props.theme.system.borderRadius};
  
  ${(props) => props.size === 'small' && css`
    width: 20rem;
  `};
`;

interface ModalProps extends HtmlHTMLAttributes<HTMLDivElement> {
  active: boolean;
  onTriggerClose: () => void;
  size: 'small';
}

export default function Modal({
  children, active, onTriggerClose, size,
}: ModalProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const outsideClickListener = (e: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
      onTriggerClose();
    }
  };

  useEffect(() => {
    if (active) {
      window.addEventListener('click', outsideClickListener);
    }
    return () => {
      window.removeEventListener('click', outsideClickListener);
    };
  }, [active]);

  return active ? (
    <Background>
      <ModalContainer size={size} ref={containerRef}>
        {children}
      </ModalContainer>
    </Background>
  )
    : <></>;
}
