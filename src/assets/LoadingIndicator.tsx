import React from 'react';
import styled, { keyframes } from 'styled-components';

const LoadingBar = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  height: 1em;
  width: 200px;
  border: 1px solid black;
`;

const animateLoading = keyframes`
  from {
    max-width: 0;
  }
  
  to {
    max-width: 100%;
  }
`;

const Indicator = styled.div`
  height: 100%;
  width: 200px;
  background-color: red;
  animation: ${animateLoading} 1000ms infinite linear;
`;

export default function LoadingIndicator() {
  return (<LoadingBar><Indicator /></LoadingBar>);
}
