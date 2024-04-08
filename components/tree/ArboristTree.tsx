"use client";

import { useEffect } from "react";
import { Tree } from "react-arborist";

import { useSimpleTree, useAsynchronousSerialize } from "@/hooks/domain/useHandleTree";
import { useSWRSidebarTree } from "@/hooks/swr";

const LOCAL_API_URL = 'http://localhost:3000/api/sidebar/';

const ArboristTree = () => {
  const { data, unSerializedData ,isValidating, mutate } = useSWRSidebarTree();
  const [treeData, setData ,controller] = useSimpleTree(unSerializedData ?? []);

  useEffect(() => {
    setData(unSerializedData ?? []);
  }, [unSerializedData]);

  useAsynchronousSerialize(treeData);

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
