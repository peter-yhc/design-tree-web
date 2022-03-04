import React, { useState } from 'react';
import { ProjectType } from 'store/profile/profile-store';
import dayjs from 'dayjs';
import { ChevronRightIcon, PencilIcon, TrashIcon } from '@heroicons/react/outline';
import styled, { css } from 'styled-components';
import EditNameModal from './EditNameModal';

const Table = styled.table`
  text-align: left;
  width: 70rem;
  border-collapse: collapse;
`;

const Thead = styled.thead`
  border-bottom: 2px solid ${(props) => props.theme.colours.darkGrey};
`;

const Tr = styled.tr<{ $sub?: boolean; }>`
  &:not(:last-child) {
    border-bottom: 1px solid ${(props) => props.theme.colours.grey};
  }
  
  & td:first-child,th:first-child {
    padding-left: 1em;
  }

  ${(props) => props.$sub && css`
    background-color: hsl(210,15%,99%);
    &:not(:last-child) {
      border-bottom: 1px solid hsl(210,15%,95%);
    }
    
    & > td:first-child {
      padding-left: ${props.theme.innerSpacing.xlarge};
      position: relative;
      
      &:before {
        position: absolute;
        top: 0;
        left: 0;
        content: '';
        width: 0.5rem;
        height: 100%;
        background-color: ${props.theme.colours.primaryLighter};
      }
    }
  `}
`;

const Th = styled.th<{ $center?: boolean; }>`
  padding: ${(props) => props.theme.innerSpacing.small};
  
  & > h5 {
    margin: 0;
  }
  
  &:first-child {
    width: 35%;
  }

  ${(props) => props.$center && css`
    text-align: center;
  `}
`;

interface TdProps {
  $mono?: boolean;
  $center?: boolean;
  $openChildren?: boolean;
}

const Td = styled.td<TdProps>`
  position: relative;
  padding: ${(props) => props.theme.innerSpacing.small};
  
  ${(props) => props.$mono && css`
    font-family: 'Roboto Mono', sans-serif;
    font-size: 0.85rem;
  `}
  
  ${(props) => props.$center && css`
    text-align: center;
  `}
  
  ${(props) => props.$openChildren && css`
    &:before {
      position: absolute;
      top: 0;
      left: 0;
      content: '';
      width: 0.5rem;
      height: 100%;
      background-color: ${props.theme.colours.primaryDarkest};
    }
  `}
`;

const ActionContainer = styled.div`
  display: flex;
  column-gap: ${(props) => props.theme.innerSpacing.medium};
  align-items: center;
  justify-content: center;
`;

const ActionButton = styled.button.attrs({ type: 'button' })`
  border: 0;
  display: flex;
  place-content: center;
  cursor: pointer;
`;

const RotatingActionButton = styled(ActionButton)<{$rotate: boolean}>`
  transition: transform 0.2s ease-in-out;
  
  ${(props) => props.$rotate && css`
    transform: rotate(90deg);
  `}
`;

interface RenderRowProps {
  name: string,
  uid: string,
  createdAt: Date,
  lastActive: Date | null,
  imageCount: number,
  options: {sub?: boolean, hasChildren?: boolean}
}

interface ProjectSettingTableProps {
  project: ProjectType
}

export default function ProjectSettingTable({ project }: ProjectSettingTableProps) {
  const [openCollections, setOpenCollections] = useState<string[]>([]);
  const [showEditName, setShowEditName] = useState(false);

  const handleSubToggle = (collectionKey: string) => () => {
    if (openCollections.includes(collectionKey)) {
      const index = openCollections.indexOf(collectionKey);
      openCollections.splice(index, 1);
      setOpenCollections([...openCollections]);
    } else {
      setOpenCollections([...openCollections, collectionKey]);
    }
  };

  const renderRow = ({
    name, uid, createdAt, lastActive, imageCount, options,
  }: RenderRowProps) => (
    <Tr $sub={options.sub}>
      <Td $openChildren={openCollections.includes(uid)}>
        {name}
      </Td>
      <Td $mono>{dayjs(createdAt).format('DD MMM YYYY')}</Td>
      <Td $mono>{lastActive ? dayjs(lastActive).format('DD MMM YYYY') : 'Never used'}</Td>
      <Td $center>{imageCount}</Td>
      <Td>
        <ActionContainer>
          <ActionButton onClick={() => setShowEditName(true)}><PencilIcon width="1.125rem" /></ActionButton>
          <ActionButton><TrashIcon width="1.125rem" /></ActionButton>
        </ActionContainer>
      </Td>
      <Td>{options.hasChildren && <RotatingActionButton $rotate={openCollections.includes(uid)} onClick={handleSubToggle(uid)}><ChevronRightIcon width="1.125rem" /></RotatingActionButton>}</Td>
    </Tr>
  );

  const { collections } = project;

  return (
    <>
      <Table>
        <Thead>
          <Tr>
            <Th><h5>Name</h5></Th>
            <Th><h5>Created at</h5></Th>
            <Th><h5>Last active</h5></Th>
            <Th $center><h5>Image count</h5></Th>
            <Th />
          </Tr>
        </Thead>
        <tbody>
          {Object.keys(collections).map((cKey) => {
            const { focuses } = collections[cKey];
            const hasChildren = Object.keys(focuses).length > 0;
            return (
              <>
                { renderRow({ ...collections[cKey], options: { hasChildren } })}
                {
                hasChildren && openCollections.includes(cKey) && (
                  <>
                    { Object.values(focuses).map((focus) => renderRow({ ...focus, options: { sub: true } })) }
                  </>
                )
              }
              </>
            );
          })}
        </tbody>
      </Table>
      <EditNameModal active={showEditName} onTriggerClose={() => setShowEditName(false)} />
    </>
  );
}
