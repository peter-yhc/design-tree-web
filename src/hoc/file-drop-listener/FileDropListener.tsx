import React, { ReactNode, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled, { css } from 'styled-components';
import { UploadIcon } from '@heroicons/react/solid';
import { createClipboardListener, createDragdropListener } from './utils/listener-functions';

interface FileDropListenerProps {
  children: ReactNode
}

declare global {
  // eslint-disable-next-line no-unused-vars
  interface WindowEventMap {
    paste: ClipboardEvent
  }
}

const Container = styled.div`
  position: relative;
`;

const Overlay = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: hsl(0,0%,46%,0.9);

  ${(props) => props.hidden && css`
    display: none;
  `}
`;

const OverlayModal = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 485px;
  height: 300px;
  background-color: ${(props) => props.theme.colours.lightGrey};
  border-radius: 5px;
  border: 1px solid hsl(210,15%,90%);
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
`;

const DottedRectangle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: ${(props) => props.theme.innerSpacing.xlarge};
  width: 425px;
  height: 240px;
  border-radius: 35px;
  border: 2px dashed ${(props) => props.theme.colours.grey};
  background-color: hsl(203,40%,87%,0.5);
`;

const UploadText = styled.p`
  color: ${(props) => props.theme.colours.black};
  width: 30ch;
`;

const Upload = styled(UploadIcon)`
  fill: ${(props) => props.theme.colours.darkGrey};
  width: 100px;
`;

export default function FileDropListener({ children }: FileDropListenerProps) {
  const dispatch = useDispatch();
  const [showOverlay, setShowOverlay] = useState(false);

  const clipboardListener = createClipboardListener(dispatch);
  const dragdropListener = createDragdropListener(dispatch);

  useEffect(() => {
    window.addEventListener('paste', clipboardListener);
    return () => {
      window.removeEventListener('paste', clipboardListener);
    };
  }, []);
  return (
    <Container
      onDragEnter={() => setShowOverlay(true)}
      onDragExit={() => setShowOverlay(false)}
    >
      <Overlay
        hidden={!showOverlay}
        onDrop={(e) => { dragdropListener(e); setShowOverlay(false); }}
        onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
      />
      {
        showOverlay && (
        <OverlayModal>
          <DottedRectangle>
            <UploadText>Drag an image from another website here to add it to your collection.</UploadText>
            <Upload />
          </DottedRectangle>
        </OverlayModal>
        )
      }
      {children}
    </Container>
  );
}
