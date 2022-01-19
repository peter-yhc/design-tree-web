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
  
  &:hover {
    background-color: ${(props) => props.theme.colours.grey};
  }
  
  ${(props) => props.selected && css`
    background-color: ${props.theme.colours.primary};
    color: ${props.theme.colours.white};

    &:hover {
      background-color: ${props.theme.colours.primaryDarker};
    }
    
    &:active {
      background-color: ${props.theme.colours.primaryDarkest};
    }
  `}
`;

export default SideActionButton;
