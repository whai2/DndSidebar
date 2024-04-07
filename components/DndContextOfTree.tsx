'use client'

import { DragDropContext } from 'react-beautiful-dnd';

import { useHandleSiblingByDrag } from '@/hooks/domain/useHandleTree';
import { useSWRSidebarTree } from '@/hooks/swr';

import DndTree from './DndTree';

const PAGE_PATH = '/';

interface SidebarDocument {
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  index?: number;
}

interface DocumentListProps {
  sidebarData: SidebarDocument[];
  parent_id?: string; 
}

const DndContextOfTree = ({ sidebarData, parent_id }: DocumentListProps) => {
  const { mutate } = useSWRSidebarTree();
  const { siblings, handleOnDragEnd } = useHandleSiblingByDrag(sidebarData, mutate);

  return (
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <DndTree siblings={siblings} parent_id={parent_id} level={0}/>
      </DragDropContext>
  )
}

export default DndContextOfTree

