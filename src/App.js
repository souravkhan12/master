// App.jsx
import React, { useEffect, useState } from "react";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import { v4 as uuidv4 } from "uuid";
import Sidebar from "./components/Sidebar";
import MidArea from "./components/MidArea";
import PreviewArea from "./components/PreviewArea";
import { usePositions } from "./components/usePositions";

const BLOCKS = [
  { id: "move", label: "move 10 steps", icon: "", area: "sidebar" },
  {
    id: "turn_right",
    label: "rotate 15 degrees left",
    icon: "undo",
    area: "sidebar",
  },
  {
    id: "turn_left",
    label: "rotate 15 degrees right",
    icon: "redo",
    area: "sidebar",
  },
];

export default function App() {
  const { arr, pushItems } = usePositions();
  const [midBlocks, setMidBlocks] = useState([]);
  const [activeBlock, setActiveBlock] = useState(null);

  const handleDragStart = (event) => {
    const { active } = event;
    const { area, id } = active.data.current;

    const foundBlock =
      BLOCKS.find((b) => b.id === active.id) ||
      midBlocks.find((b) => b.id === active.id);
    setActiveBlock(foundBlock || { id: active.id });

    if (area === "mid-area") {
      setMidBlocks((prev) => prev.filter((b) => b.id !== id));
      return;
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) {
      setActiveBlock(null);
      return;
    }

    if (active.data.current.label && over.id === "mid-area") {
      setMidBlocks((prev) => [
        ...prev,
        {
          ...active.data.current,
          id: `${active.id}-${uuidv4()}`,
          area: "mid-area",
        },
      ]);
    }
    setActiveBlock(null);
  };

  useEffect(() => {
    pushItems(midBlocks);
  }, [midBlocks]);

  return (
    <div className="h-screen overflow-hidden flex flex-row">
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="flex-1 h-screen flex flex-row bg-white border-r border-gray-200">
          <Sidebar blocks={BLOCKS} />
          <MidArea blocks={midBlocks} />
        </div>
        <div className="w-1/3 h-screen bg-white border-l border-gray-200">
          <PreviewArea />
        </div>

        <DragOverlay>
          {activeBlock ? (
            <div className="bg-blue-500 text-white px-2 py-1 text-sm rounded shadow-lg">
              {activeBlock.label}
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
