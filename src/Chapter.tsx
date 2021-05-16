import { useEffect, useState } from "react";
import { Grid } from "./map/Grid";
import { Group } from "./map/Group";

export interface GroupObj {
  id: number;
  start: number;
  end: number;
}

const newGroup = (start: number, end: number) => ({
  id: Math.floor(Math.random() * 100000),
  start,
  end,
});
export const Chapter = () => {
  const [groups, setGroups] = useState([
    { id: 344, start: 17, end: 18 },
    { id: 345, start: 10, end: 15 },
    { id: 346, start: 21, end: 23 },
  ]);
  const [drag, setDrag] = useState<[number, number] | null>(null);
  const dragStart = drag && (drag[0] <= drag[1] ? drag[0] : drag[1]);
  const dragEnd = drag && (drag[0] <= drag[1] ? drag[1] : drag[0]);

  useEffect(() => {
    window.addEventListener("mouseup", () => setDrag(null));
  });
  const addGroup = (group: GroupObj) => {
    setGroups((groups) => [...groups, group]);
  };
  const updateDrag = (i: number) => drag && setDrag([drag[0], i]);
  return (
    <>
      <Grid
        onClick={(i) => addGroup(newGroup(i, i + 1))}
        onContextMenu={(i) => console.log(i, "right grid")}
        onMouseDown={(i) => setDrag([i, i])}
        onMouseEnter={updateDrag}
      />
      {groups.map((group, index) => (
        <Group
          key={group.id}
          start={group.start}
          end={group.end}
          onClick={(i) =>
            setGroups((groups) => [
              ...groups.slice(0, index),
              ...groups.slice(index + 1),
            ])
          }
        />
      ))}
      {drag && (
        <Group
          start={dragStart || 0}
          end={dragEnd || 0}
          onMouseUp={() => addGroup(newGroup(dragStart || 0, dragEnd || 0))}
          onMouseEnter={updateDrag}
        />
      )}
    </>
  );
};
