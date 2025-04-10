import React from "react";
import { useDroppable, useDraggable } from "@dnd-kit/core";
import Icon from "./Icon";

function DraggableMidBlock({ block }) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: block.id,
    data: block,
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="flex w-60 bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer rounded"
    >
      {block.label}
      {block.icon && (
        <Icon name={block.icon} className="white mx-2" size={15} />
      )}
    </div>
  );
}

export default function MidArea({ blocks }) {
  const { setNodeRef } = useDroppable({ id: "mid-area" });

  return (
    <div ref={setNodeRef} className="flex-1 h-full overflow-auto p-2">
      {blocks.length > 0 &&
        blocks.map((block) => (
          <DraggableMidBlock key={block.id} block={block} />
        ))}
    </div>
  );
}
