"use client";

import { useEffect } from "react";
import { Tree } from "react-arborist";

import { useSimpleTree } from "@/hooks/domain/useHandleTree";
import { useSWRSidebarTree } from "@/hooks/swr";

const ArboristTree = () => {
  const { data, isValidating, mutate } = useSWRSidebarTree();
  const [treeData, setData ,controller] = useSimpleTree(data ?? []);

  useEffect(() => {
    setData(data ?? []);
  }, [data]);

  return (
    <Tree
      data={treeData}
      openByDefault={false}
      width={600}
      height={1000}
      indent={24}
      rowHeight={36}
      overscanCount={1}
      paddingTop={30}
      paddingBottom={10}
      padding={25 /* sets both */}
      {...controller}
    />
  );
};

export default ArboristTree;
