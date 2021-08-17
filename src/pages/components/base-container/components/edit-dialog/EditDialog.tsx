import {
  PencilIcon, ArrowCircleRightIcon, DuplicateIcon, TrashIcon, XCircleIcon,
} from '@heroicons/react/outline';
import React, { useState } from 'react';
import styled, { css } from 'styled-components';

const Container = styled.div`
  position: relative;
  display: flex;
  height: 100%;
  align-items: center;
  margin-right: ${(props) => props.theme.outerSpacing.small};
`;

const EditButton = styled.button`
  display: flex;
  cursor: pointer;
  border: 0;
  background-color: transparent;
`;

const Dialog = styled.div`
  position: fixed;
  top: 59px;
  right: 10px;
  border: 1px solid ${(props) => props.theme.colours.grey};
  display: flex;
  flex-direction: column;
  padding: ${(props) => props.theme.innerSpacing.medium};
  transition: right ease-out 0.4s;
  background-color: ${(props) => props.theme.colours.lightGrey};
  
  ${(props) => props.hidden && css`
    right: -100%;
  `}
  
  &:before {
    position: absolute;
    top: 50%;
    right: -0.5em;
    transform: translateY(-50%) rotate(45deg);
    content: ' ';
    border: 1px solid blue;
    width: 1em;
    height: 1em;
  }
`;

const Button = styled.button`
  border: 0;
  background-color: transparent;
  display: flex;
  margin: ${(props) => props.theme.outerSpacing.tiny};
  
  & > svg {
    margin-right: ${(props) => props.theme.outerSpacing.tiny}
  }
`;

export default function EditDialog() {
  const [dialogHidden, setDialogHidden] = useState(false);

  return (
    <Container>
      <EditButton onClick={() => setDialogHidden(!dialogHidden)}>
        <PencilIcon width="1.6em" />
      </EditButton>
      <Dialog hidden={dialogHidden}>
        <Button>
          <ArrowCircleRightIcon width={20} />
          Move
        </Button>
        <Button>
          <TrashIcon width={20} />
          Delete
        </Button>
        <Button>
          <DuplicateIcon width={20} />
          Copy
        </Button>
        <Button>
          <XCircleIcon width={20} />
          Close
        </Button>
      </Dialog>
    </Container>
  );
}
