'use client'

import { useSWRSidebarTree } from "@/hooks/swr";
import { addNodeInSidebarTree, deleteAll } from "@/lib/actions"

import DocumentList from "./DocumentList"

const PAGE_PATH = '/';
const ROOT_NODE = "root";
const LOCAL_API_URL = 'http://localhost:3000/api/sidebar/';

const SideBar = () => {
  const { data, isValidating, mutate } = useSWRSidebarTree();

  const handleMutate = () => {
    mutate(LOCAL_API_URL);
  }

  if (isValidating) {
    return (
      <div>
        <form action={()=>{addNodeInSidebarTree(PAGE_PATH)}}>
          <button type="submit" onClick={handleMutate}>루트 +</button>
        </form>
      </div>
    )
  }

  const { sidebarData } = data;

  return (
    <div>
      <form action={()=>{addNodeInSidebarTree(PAGE_PATH)}}>
        <button type="submit" onClick={handleMutate}>루트 +</button>
      </form>
      <DocumentList sidebarData={sidebarData}/>
    </div>
  )
}

export default SideBar