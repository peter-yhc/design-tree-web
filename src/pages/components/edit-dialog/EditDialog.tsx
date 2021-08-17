import { PencilIcon } from '@heroicons/react/outline';
import React, { useState } from 'react';
import styled from 'styled-components';

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
  position: absolute;
  border: 1px solid red;
  top: 100%;
  right: 50%;
  transform: translateX(50%);
`;

export default function EditDialog() {
  const [dialogHidden, setDialogHidden] = useState(true);

  return (
    <Container>
      <EditButton onClick={() => setDialogHidden(!dialogHidden)}>
        <PencilIcon width="1.6em" />
      </EditButton>
      <Dialog hidden={dialogHidden}>
        <span>Move</span>
        <span>Delete</span>
        <span>Copy</span>
      </Dialog>
    </Container>
  );
}
