import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { useLocation } from 'react-router-dom';

interface IndicatorProps {
  y: number;
}

const Indicator = styled.div<IndicatorProps>`
  position: absolute;
  height: 1.7em;
  width: 4px;
  background-color: ${(props) => props.theme.colours.primary};
  left: calc(${(props) => props.theme.system.sideNavWidth} - 4px);
  transition: all ease-in-out 200ms;

  ${(props) => css`
    top: ${props.y}px;
  `}
`;

export default function NavIndicator() {
  const [y, setY] = useState(0);
  const location = useLocation();

  useEffect(() => {
    // @ts-ignore
    setY(document.querySelector('nav a[active=true]').getBoundingClientRect().y);
  }, [location]);

  return (
    <Indicator y={y} hidden={y === 0} />
  );
}
