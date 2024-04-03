'use client'

import { addNodeInSidebarTree } from "@/lib/actions"

import DocumentList from "./DocumentList"

const PAGE_PATH = '/';
const ROOT_NODE = "root";

interface SidebarDocument {
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  parent_id?: string; 
}

interface DocumentListProps {
  data: SidebarDocument[]; // SidebarDocument 객체의 배열로, 선택적 속성입니다.
}

const SideBar = ({data}: DocumentListProps) => {

  return (
    <div>
      <form action={()=>{addNodeInSidebarTree(PAGE_PATH)}}>
        <button type="submit">루트 +</button>
      </form>
      <DocumentList sidebarData={data}/>
    </div>
  )
}

export default SideBar