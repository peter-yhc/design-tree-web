import React, { ReactNode, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled, { css } from 'styled-components';
import { CheckIcon, CloudUploadIcon } from '@heroicons/react/solid';
import { useRouteMatch } from 'react-router-dom';
import { createClipboardListener, createDragdropListener } from './utils/listener-functions';
import { useProject } from '../../hooks';

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
  z-index: 200;
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
  z-index: 201;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 6rem;
  height: 6rem;
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
  width: 4.5rem;
`;

const Upload = styled(CloudUploadIcon)`
  fill: ${(props) => props.theme.colours.darkGrey};
  width: 4.5rem;
`;

const OverlayState = {
  DRAG: 'drag',
  DROP: 'drop',
  FINISHED: 'finished',
  HIDDEN: 'hidden',
};

interface MatchProps {
  project: string;
  collection: string;
  focus: string;
}

export default function FileDropListener({ children }: FileDropListenerProps) {
  const match = useRouteMatch<MatchProps>();

  const { projectId } = useProject();
  const dispatch = useDispatch();
  const [showOverlay, setShowOverlay] = useState(OverlayState.HIDDEN);

  const clipboardListener = createClipboardListener(dispatch, projectId, match.params.collection);
  const dragdropListener = createDragdropListener(dispatch, () => setShowOverlay(OverlayState.FINISHED), projectId, match.params.collection);

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
