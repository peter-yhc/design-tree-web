import React, { Fragment, useState } from 'react';
import { ProjectType } from 'store/profile/profile-store';
import dayjs from 'dayjs';
import { ChevronRightIcon, PencilIcon, TrashIcon } from '@heroicons/react/outline';
import styled, { css } from 'styled-components';
import EditNameModal from './EditNameModal';
import DeleteFolderModal from './DeleteFolderModal';
import { DeleteModalTargetType, EditModalTargetType } from './ModalTypes';

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
  cuid: string,
  fuid?: string,
  createdAt: Date,
  lastActive: Date | null,
  imageCount: number,
  options: {sub?: boolean, hasChildren?: boolean}
}

interface ProjectSettingTableProps {
  project: ProjectType & {uid: string};
}

export default function ProjectSettingTable({ project }: ProjectSettingTableProps) {
  const [openCollections, setOpenCollections] = useState<string[]>([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [editTarget, setEditTarget] = useState<EditModalTargetType>();
  const [deleteTarget, setDeleteTarget] = useState<DeleteModalTargetType>();

  const handleSubToggle = (collectionKey: string) => () => {
    if (openCollections.includes(collectionKey)) {
      const index = openCollections.indexOf(collectionKey);
      openCollections.splice(index, 1);
      setOpenCollections([...openCollections]);
    } else {
      setOpenCollections([...openCollections, collectionKey]);
    }
  };

  const handleEditClick = (target : EditModalTargetType) => () => {
    setShowEditModal(true);
    setEditTarget(target);
  };

  const handleDeleteClick = (target : DeleteModalTargetType) => () => {
    setShowDeleteModal(true);
    setDeleteTarget(target);
  };

  const renderRow = ({
    name, cuid, fuid, createdAt, lastActive, imageCount, options,
  }: RenderRowProps) => {
    const target = {
      name, puid: project.uid, cuid, fuid,
    };
    return (
      <Tr $sub={options.sub} key={`${cuid}${fuid}`}>
        <Td $openChildren={openCollections.includes(cuid)}>
          {name}
        </Td>
        <Td $mono>{dayjs(createdAt).format('DD MMM YYYY')}</Td>
        <Td $mono>{lastActive ? dayjs(lastActive).format('DD MMM YYYY') : 'Never used'}</Td>
        <Td $center>{imageCount}</Td>
        <Td>
          <ActionContainer>
            <ActionButton onClick={handleEditClick(target)}>
              <PencilIcon width="1.125rem" />
            </ActionButton>
            <ActionButton onClick={handleDeleteClick(target)}>
              <TrashIcon width="1.125rem" />
            </ActionButton>
          </ActionContainer>
        </Td>
        <Td>{options.hasChildren && <RotatingActionButton $rotate={openCollections.includes(cuid)} onClick={handleSubToggle(cuid)}><ChevronRightIcon width="1.125rem" /></RotatingActionButton>}</Td>
      </Tr>
    );
  };

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
            const collection = collections[cKey];
            const { focuses } = collections[cKey];
            const hasChildren = Object.keys(focuses).length > 0;

            return (
              <Fragment key={cKey}>
                { renderRow({
                  ...collection, cuid: collection.uid, options: { hasChildren },
                })}
                {
                hasChildren && openCollections.includes(cKey) && (
                  <>
                    { Object.values(focuses).map((focus) => renderRow({
                      ...focus, cuid: collection.uid, fuid: focus.uid, options: { sub: true },
                    })) }
                  </>
                )
              }
              </Fragment>
            );
          })}
        </tbody>
      </Table>
      <EditNameModal active={showEditModal} onTriggerClose={() => setShowEditModal(false)} target={editTarget!!} />
      <DeleteFolderModal active={showDeleteModal} onTriggerClose={() => setShowDeleteModal(false)} target={deleteTarget!!} />
    </>
  );
}
