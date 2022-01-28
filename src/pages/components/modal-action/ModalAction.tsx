import React, {
  ReactNode, useEffect, useRef, useState,
} from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useAttachModalEscape } from 'hooks';
import { useAppSelector } from 'store';
import formsStore from 'store/forms/forms-store';
import systemStore from 'store/system/system-store';
import Button from '../button/Button';
import { FormName } from '../../../store/forms/FormName';

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
  max-height: 50vh;
  overflow-y: auto;
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
  saveValidity: boolean;
  onSave: () => void;
  onCancel?: () => void;
  formName: FormName;
  children: ReactNode;
}

export default function ModalAction({
  className, disabled, label, onSave, onCancel, saveValidity, formName, children,
}: ModalActionProps) {
  const dispatch = useDispatch();
  const modalRef = useRef<HTMLDivElement>(null);
  const [modalHidden, setModalHidden] = useState(true);
  const formState = useAppSelector((state) => (state.forms as {[index: string]:any})[formName].status);

  useAttachModalEscape(() => setModalHidden(true));

  useEffect(() => {
    if (formState === 'DONE') {
      // TODO hook into this to animate save button
      setModalHidden(true);
      dispatch(formsStore.actions.resetForm(formName));
    }
  }, [formState]);

  useEffect(() => {
    dispatch(systemStore.actions.setGlobalScrollDisableToggle(!modalHidden));
  }, [modalHidden]);

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
                {/* eslint-disable-next-line no-unused-expressions */}
                <Button onClick={() => { setModalHidden(true); onCancel && onCancel(); }}>
                  Cancel
                </Button>
                <Button primary onClick={onSave} disabled={!saveValidity}>Save</Button>
              </ButtonRow>
            </DialogModal>
          </ModalBackground>
        )
      }
    </>
  );
}
