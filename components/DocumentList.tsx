'use client'

import { useState, useCallback } from "react";

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

import { sortSiblingNodes } from "@/lib/actions";
import { useResetServerContext } from "@/hooks/useResetServerContext";

const PAGE_PATH = '/';

interface SidebarDocument {
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  parent_id?: string; 
  index?: number;
}

interface DocumentListProps {
  sidebarData: SidebarDocument[]; // SidebarDocument 객체의 배열로, 선택적 속성입니다.
}

const DocumentList = ({ sidebarData }: DocumentListProps) => {
  const [treeChildren, setTreeChildren] = useState(sidebarData);

  const handleOnDragEnd = useCallback(async (result: any) => {
    if (!result.destination) return;

    const items = Array.from(treeChildren);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTreeChildren(items);
    console.log(items);

    //server actions
    await sortSiblingNodes(PAGE_PATH, items);
  }, []);

  useResetServerContext(); // reset for beautiful dnd.

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="characters">
      {(provided) => (
        <ul className="characters" {...provided.droppableProps} ref={provided.innerRef}>
          {treeChildren.map(({_id, parent_id, index: siblingIndex}, index) => {
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
