'use client'

import { useEffect } from "react";
import { Tree, useSimpleTree } from "react-arborist";

import { data } from "./data";

const ArboristTree = () => {
  const [treeData, controller] = useSimpleTree(data);

  useEffect(() => {
    console.log(treeData);
  }, [treeData]);

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
  )
}

export default ArboristTree