import { getSidebarTree } from "@/lib/actions";

import SideBar from "@/components/SideBar";

export default async function Home() {
  const data = await getSidebarTree();
  const { sidebarData } = data;

  return (
    <div className="overflow-y-auto flex flex-col w-60 h-full relative bg-[#f5f5dc]">
      <SideBar data={sidebarData}/>
    </div>
  );
}
