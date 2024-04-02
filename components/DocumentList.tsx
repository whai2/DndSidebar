// 'use client'

// import { useState, useRef } from "react";
// import { useDrag, useDrop } from 'react-dnd'

// interface DocumentListProps {
//   level?: number;
// }

// const DocumentList = ({level=0, text, index, moveListItem }: DocumentListProps) => {
//   const [children, setChildren] = useState<number[]>([]);

//   const [{ isDragging }, dragRef] = useDrag({
//     type: 'item',
//     item: { index },
//     collect: (monitor) => ({
//         isDragging: monitor.isDragging(),
//     }),
// })

//   const [spec, dropRef] = useDrop({
//     accept: 'item',
//     hover: (item, monitor) => {
//         const dragIndex = item.index
//         const hoverIndex = index
//         const hoverBoundingRect = ref.current?.getBoundingClientRect()
//         const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
//         const hoverActualY = monitor.getClientOffset().y - hoverBoundingRect.top

//         // if dragging down, continue only when hover is smaller than middle Y
//         if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return
//         // if dragging up, continue only when hover is bigger than middle Y
//         if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return

//         moveListItem(dragIndex, hoverIndex)
//         item.index = hoverIndex
//     },
//   })

//   const ref = useRef(null)
//     const dragDropRef = dragRef(dropRef(ref))

//   const addChild = () => {
//     const currentChildren = (children.at(-1) ?? 0) + 1;
//     setChildren((newChildren) => [...newChildren, currentChildren]);
//   }

//   return (
//     <div style={{paddingLeft: level ? `${(level * 12) + 25}px` : undefined}} ref={dragDropRef}>
//       {text}
//       <button onClick={addChild}>+</button>
//       {children.map((child) => (
//         <DocumentList key={child} level={level+1} />
//       ))}
//     </div>
//   )
// }

// export default DocumentList