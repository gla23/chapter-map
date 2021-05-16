import { useEffect, useState } from "react";
import { Grid } from "./Grid";
import { Group } from "./Group";

type Fill = [number, number, number];
export interface GroupObj {
  id: number;
  start: number;
  end: number;
  fill: Fill;
}

const randomInt = (max: number) => Math.floor(Math.random() * max);
const newGroup = (start: number, end: number, fill?: Fill): GroupObj => ({
  id: Math.floor(Math.random() * 100000),
  start,
  end,
  fill: fill || [randomInt(360), 100, 90],
});

interface ChapterProps {
  length: number;
  groups?: GroupObj[];
}
export const Chapter = (props: ChapterProps) => {
  const { length } = props;
  const [groups, setGroups] = useState<GroupObj[]>(props.groups || []);

  const [drag, setDrag] = useState<[number, number, Fill] | null>(null);
  const dragStart = drag && (drag[0] <= drag[1] ? drag[0] : drag[1]);
  const dragEnd = drag && (drag[0] <= drag[1] ? drag[1] : drag[0]);

  useEffect(() => {
    window.addEventListener("mouseup", () => setDrag(null));
  });
  const addGroup = (group: GroupObj) => {
    setGroups((groups) => [...groups, group]);
  };
  const updateDrag = (i: number) =>
    drag && setDrag((old) => old && [drag[0], i, old[2]]);
  return (
    <>
      <Grid
        length={length}
        onClick={(i) => addGroup(newGroup(i, i + 1))}
        onContextMenu={(i) => console.log(i, "right grid")}
        onMouseDown={(i) => setDrag([i, i, [randomInt(360), 100, 90]])}
        onMouseEnter={updateDrag}
      />
      {groups.map((group, index) => (
        <Group
          key={group.id}
          group={group}
          updateGroup={(group) =>
            setGroups((groups) => [
              ...groups.slice(0, index),
              group,
              ...groups.slice(index + 1),
            ])
          }
          onClick={(i) =>
            setGroups((groups) => [
              ...groups.slice(0, index),
              ...groups.slice(index + 1),
            ])
          }
        />
      ))}
      {drag && dragStart && dragEnd && (
        <Group
          group={{ id: 0, start: dragStart, end: dragEnd, fill: drag[2] }}
          onMouseUp={() =>
            addGroup(newGroup(dragStart || 0, dragEnd || 0, drag[2]))
          }
          onMouseEnter={updateDrag}
        />
      )}
    </>
  );
};
