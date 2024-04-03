'use client'

import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

interface SidebarDocument {
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  parent_id?: string; 
}

interface DocumentListProps {
  sidebarData: SidebarDocument[]; // SidebarDocument 객체의 배열로, 선택적 속성입니다.
}

const DocumentList = ({ sidebarData }: DocumentListProps) => {
  const [treeChildren, setTreeChildren] = useState(sidebarData);

  const handleOnDragEnd = async (result: any) => {
    if (!result.destination) return;

    const items = Array.from(treeChildren);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTreeChildren(items);
  } 

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="characters">
      {(provided) => (
        <ul className="characters" {...provided.droppableProps} ref={provided.innerRef}>
          {treeChildren.map(({_id, parent_id}, index) => {
            return (
              <Draggable key={_id} draggableId={_id} index={index}>
                {(provided) => (
                  <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    <div className="characters-thumb">{_id}</div>
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