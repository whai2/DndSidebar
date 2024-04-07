'use client'

import { Droppable, Draggable } from 'react-beautiful-dnd';

import { addNodeInSidebarTree } from "@/lib/actions"

import './DndTree.css';

const PAGE_PATH = '/';

interface SidebarDocument {
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  index?: number;
}

interface DocumentListProps {
  siblings: SidebarDocument[];
  parent_id?: string;
  level: number;
}

const DndTree = ({ siblings, parent_id, level }: DocumentListProps) => {
  return (
    <Droppable droppableId={parent_id ? parent_id : "root"}>
      {(provided) => (
        <ul {...provided.droppableProps} ref={provided.innerRef}>
          {siblings.map(({_id, index: siblingIndex}, index) => {
            return (
              <Draggable key={_id} draggableId={_id} index={index}>
                {(provided) => (
                  <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} className='button'>
                    <span style={{paddingLeft: level ? `${(level * 12) + 25}px` : undefined}}>{_id}</span>
                    <form action={()=>{addNodeInSidebarTree(PAGE_PATH, _id)}}>
                      <button type="submit">{siblingIndex}+</button>
                    </form>
                  </li>
                )}
              </Draggable>
            );
          })}
        </ul>
      )}
    </Droppable>
  )
}

export default DndTree
