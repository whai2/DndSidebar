import SideBar from "@/components/SideBar"
import Tree from "@/components/tree/ArboristTree";

export default function Home() {
  return (
    <>
      <div className="overflow-y-auto flex flex-col w-61 h-full relative bg-[#f5f5dc]">
        <SideBar />
      </div>
      <Tree/>
    </>
  );
}
