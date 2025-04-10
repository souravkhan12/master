import React from "react";
import Icon from "./Icon";
import { usePositions } from "./usePositions";
import { useDraggable } from "@dnd-kit/core";

function DraggableBlock({ id, label, icon }) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id,
    data: { label, icon },
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="flex bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer rounded"
    >
      {label}
      {icon && <Icon name={icon} className="text-white mx-2" size={15} />}
    </div>
  );
}

export default function Sidebar({ blocks }) {
  const { setStart } = usePositions();

  return (
    <div className="w-60 flex-none h-full overflow-y-auto flex flex-col items-start p-2 border-r border-gray-200">
      <div className="font-bold"> {"Events"} </div>
      <div
        onClick={() => setStart(true)}
        className="flex flex-row flex-wrap bg-yellow-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
      >
        {"When "}
        <Icon name="flag" size={15} className="text-green-600 mx-2" />
        {"clicked"}
      </div>
      <div
        onClick={() => setStart(false)}
        className="flex flex-row flex-wrap bg-yellow-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
      >
        {"When this sprite clicked"}
      </div>
      <div className="font-bold"> {"Motion"} </div>

      {blocks.map((block) => (
        <DraggableBlock key={block.id} {...block} />
      ))}
    </div>
  );
}
