export const data = [
  { id: "1", name: "Unread", category: "Unread"},
  { id: "2", name: "Threads", category: "Threads"},
  {
    id: "3",
    name: "Chat Rooms", category: "Chat Rooms",
    children: [
      { id: "c1", name: "General", category: "General"},
      { id: "b2", name: "Random", category: "Random"},
      { id: "a3", name: "Open Source Projects", category: "Open Source Projects"},
    ],
  },
  {
    id: "4",
    name: "Direct Messages", category: "Direct Messages",
    children: [
      { id: "c3", name: "Alice", category: "Alice"},
      { id: "b4", name: "Bob", category: "Bob"},
      { id: "a1", name: "Charlie", category: "Charlie" },
    ],
  },
];