import React, { ReactNode, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
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
  left: -20px;
  top: -20px;
  right: -20px;
  bottom: -20px;
  filter: blur(5px);
  background-color: hsl(0,0%,0%,0.3);
`;

const Upload = styled(UploadIcon)`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
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
      onDragEnter={() => { console.log('drag enter'); setShowOverlay(true); }}
      onDragExit={() => { console.log('drag end'); setShowOverlay(false); }}
    >
      <Overlay
        hidden={!showOverlay}
        onDrop={(e) => { dragdropListener(e); setShowOverlay(false); }}
        onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
      />
      { showOverlay && <Upload width={200} /> }
      {children}
    </Container>
  );
}
