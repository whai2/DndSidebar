"use server";

import { revalidatePath } from "next/cache";

const LOCAL_API_URL = "http://localhost:3000/api/sidebar/";

export async function addNodeInSidebarTree(path: string, parentId?: string) {
  try {
    await fetch(LOCAL_API_URL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ parent_id: parentId }),
    });

    revalidatePath(path); // path: 불어오는 페이지 경로 (ex: /app/page.tsx)
  } catch (error) {}
}

export async function getSidebarTree(url: string) {
  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error("Failed to fetch topics");
    }

    revalidatePath("/"); // path: 불어오는 페이지 경로 (ex: /app/page.tsx)
    return res.json();
  } catch (error) {
    console.log("Error loading topics: ", error);
  }
}

export async function patchNewNodes(treeData: any) {
  const serializedData = await serializeTree(treeData);
  console.log(serializedData);
  try {
    for (let i = 0; i < serializedData.length; i++) {
      const { _id, index, parent_id } = serializedData[i];
      const bodyObject = {
        _id,
        index,
        ...(parent_id !== undefined && { parent_id }), // parent_id가 undefined가 아닐 때만 객체에 포함
      };

      await fetch(LOCAL_API_URL, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyObject),
      });
    }

    revalidatePath("/"); // path: 불어오는 페이지 경로 (ex: /app/page.tsx)
  } catch (error) {
    console.log("Error loading topics: ", error);
  }
}

export async function deleteAll() {
  try {
    await fetch(LOCAL_API_URL, {
      method: "DELETE",
    });
  } catch (error) {
    console.log("Error loading topics: ", error);
  }
}

export async function makeTree(treeData: any) {
  if (!treeData) return; 

  const newTreeData = treeData.slice(0);
  const treeArray: any = [];

  const rootNodes = makeRootNodes(newTreeData, treeArray); // newTreeData 중 일부 제거 로직 포함

  for (let i = 0; i < treeArray.length; i++) {
    dfsForChildNodes(treeArray[i], newTreeData, 0);
  }

  return treeArray;
}

function makeRootNodes(newTreeData: any, treeArray: any) {
  const rootNodes = [];
  for (let i = newTreeData.length - 1; i >= 0; i--) {
    let treeNode: any = {};

    const { _id, parent_id } = newTreeData[i];
    if (!parent_id) {
      treeNode["id"] = (i+1).toString();
      treeNode["name"] = _id;
      treeNode["children"] = [];
      treeArray.push(treeNode);

      const deletedData = newTreeData.splice(i, 1);
      rootNodes.push(deletedData[0]);
    }
  }

  return rootNodes;
}

function dfsForChildNodes(
  parentNode: any,
  nodeList: any, // rowData 형태
  depth: number
) {
  for (let i = nodeList.length - 1; i >= 0; i--) {
    if (nodeList[i].parent_id === parentNode.name) {
      parentNode["children"].push({id: `${i + 1}-${nodeList[i].parent_id}`, name: nodeList[i]._id, children: []})
      nodeList.splice(i, 1);

      dfsForChildNodes(parentNode["children"][0], nodeList, depth+1);
    }
  }
}

export async function serializeTree(treeData : any) {
  const serializedArray: any = [];
  for (let i = 0; i < treeData.length; i++) {
    const serializedNode: any = {};
    serializedNode["_id"] = treeData[i].name;
    serializedNode["index"] = i;

    serializedArray.push(serializedNode);

    if (treeData[i].children.length) {
      dfsToSerializeChildren(serializedArray, treeData[i])
    }
  }

  return serializedArray;
}

function dfsToSerializeChildren(serializedArray: any, hasChildrenNode: any) {
  for (let i = 0; i < hasChildrenNode.children.length; i++) {
    const serializedNode: any = {};
    serializedNode["_id"] = hasChildrenNode.children[i].name;
    serializedNode["index"] = i;
    serializedNode["parent_id"] = hasChildrenNode.name;

    serializedArray.push(serializedNode);

    if (hasChildrenNode.children[i].children.length) {
      dfsToSerializeChildren(serializedArray, hasChildrenNode.children[i]);
    }
  }
}