import styled, { css } from 'styled-components';

interface SideActionButtonProps {
  selected: boolean;
}

const SideActionButton = styled.button<SideActionButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: 0;
  aspect-ratio: 1;
  border-radius: 50%;
  height: 2.5rem;

  ${(props) => props.selected && css`
    background-color: ${props.theme.colours.grey};
  `}
  
  &:hover {
    background-color: ${(props) => props.theme.colours.grey};
  }
`;

export default SideActionButton;
