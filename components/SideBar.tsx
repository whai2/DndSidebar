//import DocumentList from "./DocumentList"

const getSideBarData = async () => {
  try {
    const res = await fetch('http://localhost:3000/api/sidebar/', {
      cache: "no-store",
    })

    if (!res.ok) {
      throw new Error("Failed to fetch topics");
    }

    return res.json();
  } catch (error) {
    console.log("Error loading topics: ", error);
  }
}

const SideBar = async () => {
  const data  = await getSideBarData();

  return (
    <div>
      hi
    </div>
  )
}

export default SideBar