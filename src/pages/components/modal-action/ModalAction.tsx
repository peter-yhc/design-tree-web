import React, {
  ReactNode, useEffect, useRef, useState,
} from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useAttachModalEscape } from 'hooks';
import { useAppSelector } from 'store';
import formsStore from 'store/forms/forms-store';
import Button from '../button/Button';

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: hsl(0, 0%, 20%, 0.9);
  z-index: 100;
  overflow: hidden;
`;

const DialogModal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 101;
  width: 24rem;
  background-color: ${(props) => props.theme.colours.white};
  border-radius: ${(props) => props.theme.system.borderRadius};
  padding: ${(props) => props.theme.innerSpacing.large};
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${(props) => props.theme.outerSpacing.large};
`;

interface ModalActionProps extends React.HtmlHTMLAttributes<HTMLElement> {
  label: string;
  disabled?: boolean;
  saveButton: ReactNode;
  children: ReactNode;
}

export default function ModalAction({
  className, disabled, label, saveButton, children,
}: ModalActionProps) {
  const dispatch = useDispatch();
  const modalRef = useRef<HTMLDivElement>(null);
  const [modalHidden, setModalHidden] = useState(true);
  const formState = useAppSelector((state) => state.forms.newCollectionForm.status);

  useAttachModalEscape(() => setModalHidden(true));

  useEffect(() => {
    if (formState === 'DONE') {
      setModalHidden(true);
      dispatch(formsStore.actions.resetNewCollectionForm());
    }
  }, [formState]);

  return (
    <>
      <Button className={className} inline onClick={() => setModalHidden(!modalHidden)} disabled={disabled}>
        {label}
      </Button>
      {
        !modalHidden && (
          <ModalBackground>
            <DialogModal ref={modalRef}>
              {children}
              <ButtonRow>
                <Button onClick={() => setModalHidden(true)}>Cancel</Button>
                {saveButton}
              </ButtonRow>
            </DialogModal>
          </ModalBackground>
        )
      }
    </>
  );
}
