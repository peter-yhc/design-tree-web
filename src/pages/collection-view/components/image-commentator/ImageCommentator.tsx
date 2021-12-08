import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import debounce from 'lodash.debounce';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'store';
import { deleteImageComment, updateImageComment } from 'store/images/images-store-requests';
import { useRoute } from 'hooks';

const TextArea = styled.textarea`
  resize: none;
  width: 100%;
  border: 1px solid ${(props) => props.theme.colours.grey};
  outline: 0;
  border-radius: ${(props) => props.theme.system.borderRadius};
  padding: ${(props) => props.theme.innerSpacing.small};
`;

interface ImageCommentatorProps extends React.HtmlHTMLAttributes<HTMLTextAreaElement> {
  imageUid: string;
}

export default function ImageCommentator({ className, imageUid }: ImageCommentatorProps) {
  const dispatch = useDispatch();
  const { comment } = useAppSelector((state) => state.images.currentImages[imageUid]);
  const [text, setText] = useState<string|undefined>(comment);
  const { projectUid, locationUid } = useRoute();

  useEffect(() => {
    setText(comment || '');
  }, [imageUid]);

  const commentChangeHandler = (newComment: string) => {
    if (newComment.length === 0) {
      dispatch(deleteImageComment({ projectUid, locationUid, imageUid }));
    } else {
      dispatch(updateImageComment({
        projectUid, locationUid, imageUid, comment: newComment,
      }));
    }
  };

  const debouncedCallback = useMemo(() => debounce(commentChangeHandler, 300), [imageUid]);

  return (
    <TextArea
      className={className}
      placeholder="Type notes here..."
      onChange={(e) => {
        setText(e.target.value);
        debouncedCallback(e.target.value || '');
      }}
      value={text}
    />
  );
}
