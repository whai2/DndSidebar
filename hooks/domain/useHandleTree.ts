import { useState, useCallback } from "react";

import { resetServerContext } from "react-beautiful-dnd";

import { sortSiblingNodes } from "@/lib/actions";

const PAGE_PATH = '/';

interface SidebarDocument {
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  index?: number;
}


type SidebarDataType = SidebarDocument[];

export function useHandleSiblingByDrag(sidebarData: SidebarDataType) {
  const [siblings, setSiblings] = useState(sidebarData);

  const handleOnDragEnd = useCallback(async (result: any) => {
    if (!result.destination) return;

    const items = Array.from(siblings);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setSiblings(items);

    //server actions
    resetServerContext();
    await sortSiblingNodes(PAGE_PATH, items);
  }, []);

  return { siblings, handleOnDragEnd };
}