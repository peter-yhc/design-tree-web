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
  margin-top: ${(props) => props.theme.outerSpacing.medium};
  height: 15rem;
  border: 1px solid ${(props) => props.theme.colours.grey};
  outline: 0;
  border-radius: ${(props) => props.theme.system.borderRadius};
  padding: ${(props) => props.theme.innerSpacing.small};
`;

interface ImageCommentatorProps {
  imageUid: string;
}

export default function ImageCommentator({ imageUid }: ImageCommentatorProps) {
  const dispatch = useDispatch();
  const { comment } = useAppSelector((state) => state.images.currentImages[imageUid]);
  const [text, setText] = useState(comment);
  const { projectUid, locationUid } = useRoute();

  const commentChangeHandler = (newComment: string) => {
    if (newComment.length === 0) {
      dispatch(deleteImageComment({ projectUid, locationUid, imageUid }));
    } else {
      dispatch(updateImageComment({
        projectUid, locationUid, imageUid, comment: newComment,
      }));
    }
  };

  const debouncedCallback = useMemo(() => debounce(commentChangeHandler, 300), []);
  useEffect(() => {
    if (text !== comment) {
      debouncedCallback(text || '');
    }
  }, [text]);

  return (
    <TextArea placeholder="Type notes here..." onChange={(e) => setText(e.target.value)} value={text} />
  );
}
