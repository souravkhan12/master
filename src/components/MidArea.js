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
      className="bg-gray-200 text-black px-2 py-1 my-2 text-sm cursor-pointer flex items-center"
    >
      {block.label}
      {block.icon && (
        <Icon name={block.icon} className="text-black mx-2" size={15} />
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
