import React, {
  ReactNode, useEffect, useMemo, useState,
} from 'react';
import { useDispatch } from 'react-redux';
import styled, { css } from 'styled-components';
import { CheckIcon, CloudUploadIcon } from '@heroicons/react/solid';
import { useRoute } from 'hooks';
import { Button } from 'common-components';
import systemStore from 'store/system/system-store';
import { useAppSelector } from 'store';
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
  height: 100%;
  width: 100%;
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

const ErrorMessage = styled.section`
  position: fixed;
  border: 1px solid ${(props) => props.theme.colours.grey};
  border-radius: ${(props) => props.theme.system.borderRadius};
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  background-color: ${(props) => props.theme.colours.white};
  padding: ${(props) => props.theme.innerSpacing.xlarge};
  width: 28rem;
  box-shadow: 0 0 30px 7px ${(props) => props.theme.colours.black};

  & > h5 {
    margin-bottom: ${(props) => props.theme.innerSpacing.small};
  }
`;

const DismissButton = styled(Button)`
  margin-left: auto;
  margin-top: ${(props) => props.theme.innerSpacing.large};
`;

export default function FileDropListener({ children }: FileDropListenerProps) {
  const dispatch = useDispatch();
  const { projectUid, locationUid } = useRoute();
  const [showOverlay, setShowOverlay] = useState(OverlayState.HIDDEN);
  const showBadImageUrlError = useAppSelector((state) => state.system.showBadImageUrlError);

  const clipboardListener = useMemo(() => createClipboardListener(dispatch, projectUid, locationUid), [projectUid, locationUid]);
  const dragdropListener = useMemo(() => createDragdropListener(dispatch, () => setShowOverlay(OverlayState.FINISHED), projectUid, locationUid), [projectUid, locationUid]);

  useEffect(() => {
    window.addEventListener('paste', clipboardListener);
    return () => {
      window.removeEventListener('paste', clipboardListener);
    };
  }, [clipboardListener]);

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
      {showBadImageUrlError && (
      <ErrorMessage>
        <h4>Sorry!</h4>
        <p>
          Your image could not be added because it comes from a private source. Alternatively you can take a screenshot
          to paste here or save the file to upload directly.
        </p>
        <h5>On Windows</h5>
        <p>Press Win + Shift + S to use the snipping tool</p>
        <h5>On Mac</h5>
        <p>Press Cmd + Shift + 4 to use the snipping tool</p>
        <DismissButton onClick={() => dispatch(systemStore.actions.hideBadImageUrlMessage())}>Dismiss</DismissButton>
      </ErrorMessage>
      )}
    </Container>
  );
}
