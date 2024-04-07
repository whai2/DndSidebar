'use client'

import { useSWRSidebarTree } from "@/hooks/swr";
import { addNodeInSidebarTree, makeTree } from "@/lib/actions"

import DndContextOfTree from "./DndContextOfTree";

const PAGE_PATH = '/';
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
  makeTree(sidebarData);

  return (
    <div>
      <form action={()=>{addNodeInSidebarTree(PAGE_PATH)}}>
        <button type="submit" onClick={handleMutate}>루트 +</button>
      </form>
      <DndContextOfTree sidebarData={sidebarData}/>
    </div>
  )
}

export default SideBar