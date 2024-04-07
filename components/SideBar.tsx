'use client'

import { useSimpleTree } from "react-arborist";

import { useSWRSidebarTree } from "@/hooks/swr";
import { addNodeInSidebarTree } from "@/lib/actions"

import ArboristTree from "@/components/tree/ArboristTree";

const PAGE_PATH = '/';
const LOCAL_API_URL = 'http://localhost:3000/api/sidebar/';

const SideBar = () => {
  const { mutate } = useSWRSidebarTree();

  const handleMutate = () => {
    mutate(LOCAL_API_URL);
  }

  return (
    <div>
      {/* <form action={()=>{addNodeInSidebarTree(PAGE_PATH)}}>
        <button type="submit" onClick={handleMutate}>루트 +</button>
      </form> */}
      <ArboristTree/>
      {/* <DndContextOfTree sidebarData={sidebarData}/> */}
    </div>
  )
}

export default SideBar