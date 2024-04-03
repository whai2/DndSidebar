'use client'

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { useHandleSiblingByDrag } from '@/hooks/domain/useHandleTree';
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

const DocumentList = ({ sidebarData, parent_id }: DocumentListProps) => {
  const { siblings, handleOnDragEnd } = useHandleSiblingByDrag(sidebarData);

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="characters">
      {(provided) => (
        <ul className="characters" {...provided.droppableProps} ref={provided.innerRef}>
          {siblings.map(({_id, index: siblingIndex}, index) => {
            return (
              <Draggable key={_id} draggableId={_id} index={index}>
                {(provided) => (
                  <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    <div className="characters-thumb">{siblingIndex}{_id}</div>
                  </li>
                )}
              </Draggable>
            );
          })}
        </ul>
      )}
      </Droppable>
    </DragDropContext>
  )
}

export default DocumentList
