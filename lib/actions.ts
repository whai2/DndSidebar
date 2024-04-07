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

    return res.json();
  } catch (error) {
    console.log("Error loading topics: ", error);
  }
}

export async function sortSiblingNodes(path: string, newSidebarData: any) {
  try {
    for (let i = 0; i < newSidebarData.length; i++) {
      const { _id } = newSidebarData[i];
      await fetch(LOCAL_API_URL, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ _id, index: i }),
      });
    }

    revalidatePath(path); // path: 불어오는 페이지 경로 (ex: /app/page.tsx)
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
  const newTreeData = treeData.slice(0);
  const treeArray: any = [];

  const rootNodes = makeRootNodes(newTreeData, treeArray); // newTreeData 중 일부 제거 로직 포함

  for (let i = 0; i < treeArray.length; i++) {
    dfsForChildNodes(treeArray[i], newTreeData, 0);
  }
}

function makeRootNodes(newTreeData: any, treeArray: any) {
  const rootNodes = [];
  for (let i = newTreeData.length - 1; i >= 0; i--) {
    let treeNode: any = {};

    const { _id, parent_id } = newTreeData[i];
    if (!parent_id) {
      treeNode["id"] = i;
      treeNode["key"] = _id;
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
    if (nodeList[i].parent_id === parentNode.key) {
      parentNode["children"] = parentNode["children"] ? parentNode["children"] : [];
      parentNode["children"].push({id: i, key: nodeList[i]._id})
      
      dfsForChildNodes(parentNode["children"][0], nodeList, depth+1);
    }
  }
}
