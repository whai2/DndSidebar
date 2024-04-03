'use server';

import { revalidatePath } from 'next/cache';

export async function addNodeInSidebarTree(path: string, parentId?: string) {
  try {
    await fetch('http://localhost:3000/api/sidebar/', {
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
    const res = await fetch('http://localhost:3000/api/sidebar/')

    if (!res.ok) {
      throw new Error("Failed to fetch topics");
    }

    return res.json();
  } catch (error) {
    console.log("Error loading topics: ", error);
  }
}
