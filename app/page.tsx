import SideBar from "@/components/SideBar"

export default function Home() {
  return (
    <>
      <div className="overflow-y-auto flex flex-col w-61 h-full relative bg-[#f5f5dc]">
        <SideBar />
      </div>
      {/* <Tree/> */}
    </>
  );
}
