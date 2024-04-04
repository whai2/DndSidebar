import { SWRProvider } from './swr-provider'

import SideBar from "@/components/SideBar"

export default function Home() {
  return (
    <SWRProvider>
      <div className="overflow-y-auto flex flex-col w-60 h-full relative bg-[#f5f5dc]">
        <SideBar />
      </div>
    </SWRProvider>
  );
}
