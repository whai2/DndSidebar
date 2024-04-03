'use server';

import { revalidatePath } from 'next/cache';

const LOCAL_API_URL = 'http://localhost:3000/api/sidebar/';

export async function addNodeInSidebarTree(path: string, parentId?: string) {
  try {
    await fetch(LOCAL_API_URL, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ parent_id: parentId }),
    })

    revalidatePath(path) // path: 불어오는 페이지 경로 (ex: /app/page.tsx)
  } catch (error) {

  }  
}

export async function getSidebarTree() {
  try {
    const res = await fetch(LOCAL_API_URL)

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
      const { _id } = newSidebarData[i]
      await fetch(LOCAL_API_URL, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({_id, index: i})
      })
    }
  
  revalidatePath(path) // path: 불어오는 페이지 경로 (ex: /app/page.tsx)
  } catch (error) {
    console.log("Error loading topics: ", error);
  }
}
