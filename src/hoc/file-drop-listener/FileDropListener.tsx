import React, { ReactNode, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled, { css } from 'styled-components';
import { CheckIcon, CloudUploadIcon } from '@heroicons/react/solid';
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
  width: 100px;
  height: 100px;
  background-color: ${(props) => props.theme.colours.lightGrey};
  border-radius: 50%;
  border: 1px solid hsl(210,15%,90%);
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
`;

const Check = styled(CheckIcon)`
  fill: ${(props) => props.theme.colours.darkGrey};
  width: 70px;
`;

const Upload = styled(CloudUploadIcon)`
  fill: ${(props) => props.theme.colours.darkGrey};
  width: 70px;
`;

const OverlayState = {
  DRAG: 'drag',
  DROP: 'drop',
  FINISHED: 'finished',
  HIDDEN: 'hidden',
};

export default function FileDropListener({ children }: FileDropListenerProps) {
  const dispatch = useDispatch();
  const [showOverlay, setShowOverlay] = useState(OverlayState.HIDDEN);

  const clipboardListener = createClipboardListener(dispatch);
  const dragdropListener = createDragdropListener(dispatch, () => setShowOverlay(OverlayState.FINISHED));

  useEffect(() => {
    window.addEventListener('paste', clipboardListener);
    return () => {
      window.removeEventListener('paste', clipboardListener);
    };
  }, []);

  useEffect(() => {
    if (showOverlay === OverlayState.FINISHED) {
      setTimeout(() => setShowOverlay(OverlayState.HIDDEN), 100);
    }
  }, [showOverlay]);

  return (
    <Container
      onDragEnter={() => setShowOverlay(OverlayState.DRAG)}
      onDragExit={() => setShowOverlay(OverlayState.HIDDEN)}
    >
      <Overlay
        hidden={showOverlay === OverlayState.HIDDEN}
        onDrop={(e) => { dragdropListener(e); setShowOverlay(OverlayState.HIDDEN); }}
        onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
      />
      {
        showOverlay !== OverlayState.HIDDEN && (
        <OverlayModal>
          { showOverlay === OverlayState.DRAG && <Upload /> }
          { showOverlay === OverlayState.FINISHED && <Check /> }
        </OverlayModal>
        )
      }
      {children}
    </Container>
  );
}
