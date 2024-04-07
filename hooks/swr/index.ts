"use client";

import useSWR from "swr";

import { useEffect, useState } from "react";
import { getSidebarTree, makeTree } from "@/lib/actions";

const LOCAL_API_URL = "http://localhost:3000/api/sidebar/";

export function useSWRSidebarTree() {
  const { data, error, isValidating, mutate } = useSWR(
    LOCAL_API_URL,
    getSidebarTree
  );
  const [treeData, setTreeData] = useState();
  
  useEffect(() => {
    makeTree(data?.sidebarData).then((res) =>
      setTreeData(res?.sort((a, b) => a.id - b.id))
    );
  }, [data]);

  return { data: treeData, error, isValidating, mutate };
}
