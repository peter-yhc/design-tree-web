import React from 'react';
import { ProjectType } from 'store/profile/profile-store';
import dayjs from 'dayjs';
import { PencilIcon, ReplyIcon, TrashIcon } from '@heroicons/react/outline';
import styled, { css } from 'styled-components';

const Table = styled.table`
  border: 1px solid ${(props) => props.theme.colours.grey};
  border-radius: ${(props) => props.theme.system.borderRadius};
  text-align: left;
  width: 50vw;
  border-collapse: collapse;
`;

const Tr = styled.tr`
  border: 1px solid ${(props) => props.theme.colours.grey};
`;

interface ThProps {
  $center?: boolean;
}

const Th = styled.th<ThProps>`
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
}

const Td = styled.td<TdProps>`
  padding: ${(props) => props.theme.innerSpacing.small};
  
  ${(props) => props.$mono && css`
    font-family: 'Roboto Mono', sans-serif;
    font-size: 0.85rem;
  `}
  
  ${(props) => props.$center && css`
    text-align: center;
  `}
`;

const ActionContainer = styled.div`
  display: flex;
  column-gap: ${(props) => props.theme.innerSpacing.medium};
  align-items: center;
  justify-content: center;
`;

const RotatedReplyIcon = styled(ReplyIcon)`
  transform: rotate(180deg) translateY(-0.2rem);
  margin: 0 ${(props) => props.theme.outerSpacing.small};
`;

interface ProjectSettingTableProps {
  project: ProjectType
}

export default function ProjectSettingTable({ project }: ProjectSettingTableProps) {
  const renderRow = ({
    name, createdAt, lastActive, imageCount, sub = false,
  }: {name: string, createdAt: Date, lastActive: Date | null, imageCount: number, sub?: boolean}) => (
    <Tr>
      <Td>
        {sub && <RotatedReplyIcon width="1rem" />}
        {name}
      </Td>
      <Td $mono>{dayjs(createdAt).format('DD MMM YYYY')}</Td>
      <Td $mono>{lastActive ? dayjs(lastActive).format('DD MMM YYYY - hh:mm:ss A') : 'Never used'}</Td>
      <Td $center>{imageCount}</Td>
      <Td>
        <ActionContainer>
          <PencilIcon width="1.125rem" />
          <TrashIcon width="1.125rem" />
        </ActionContainer>
      </Td>
    </Tr>
  );

  return (
    <Table>
      <thead>
        <Tr>
          <Th><h5>Name</h5></Th>
          <Th><h5>Created at</h5></Th>
          <Th><h5>Last active</h5></Th>
          <Th $center><h5>Image count</h5></Th>
          <Th />
        </Tr>
      </thead>
      <tbody>
        {Object.keys(project.collections).map((cKey) => (
          <>
            { renderRow({ ...project.collections[cKey] })}
            { Object.keys(project.collections[cKey].focuses).map((fKey) => (<>{renderRow({ ...project.collections[cKey].focuses[fKey], sub: true })}</>)) }
          </>
        ))}
      </tbody>
    </Table>
  );
}
