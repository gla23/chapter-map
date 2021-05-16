import { useState } from "react";
import { blockXY } from "./App";

interface Block {
  i: number;
  group: number;
}
const blockSelected = (map: Block[][], x: number, y: number): Block => {
  if (!map[x] || !map[x][y]) return { i: -1, group: 0 };
  return map[x][y];
};
const toMap = (numbers: number[], h?: number, w?: number) => {
  const map: Block[][] = [];
  numbers.forEach((group, index) => {
    const { x, y } = blockXY(index, h, w);
    if (!map[x]) map[x] = [];
    map[x][y] = { i: index, group };
  });
  return map;
};
const areConnectedIn =
  (arr: number[]) =>
  (a: number, b: number): boolean => {
    if (arr[a] !== arr[b]) return false;
    const smaller = a < b ? a : b;
    const bigger = a < b ? b : a;
    for (let i = smaller; i < bigger; i++) {
      if (arr[i] !== arr[a]) return false;
    }
    return true;
  };

export const OldGrid = () => {
  const w = 50;
  const h = 50;
  const [selected, setSelected] = useState(() => [
    0, 2, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 2, 2, 1, 2, 2, 2,
    2, 1, 1,
  ]);
  const areConnected = areConnectedIn(selected);

  const incElement =
    (i: number, v: number) => (e: React.MouseEvent<SVGGElement, MouseEvent>) =>
      setSelected((old) => {
        e.preventDefault();
        const copy = old.slice();
        copy[i] = copy[i] + v;
        return copy;
      });
  const map = toMap(selected, 1000);

  return (
    <>
      {selected.map((v, i) => {
        if (i === 0) return null;
        const block = blockXY(i);
        const blockLong = blockXY(i, 1000);
        const x = w * block.x;
        const y = h * block.y;
        const left = blockSelected(map, blockLong.x - 1, blockLong.y);
        const top = blockSelected(map, blockLong.x, blockLong.y - 1);
        const right = blockSelected(map, blockLong.x + 1, blockLong.y);
        const bottom = blockSelected(map, blockLong.x, blockLong.y + 1);
        return (
          <g
            className={`hover ${selected[i] ? "selected" + v : ""}`}
            transform={`translate(${x}, ${y})`}
            onClick={incElement(i, 1)}
            onContextMenu={incElement(i, -1)}
            key={i}
          >
            <rect width={w} height={h} />
            {selected[i] && (!left.group || !areConnected(i, left.i)) && (
              <line x1={0} y1={0} x2={0} y2={h} stroke="black" />
            )}
            {selected[i] && (!top.group || !areConnected(i, top.i)) && (
              <line x1={0} y1={0} x2={w} y2={0} stroke="black" />
            )}
            {selected[i] && (!right.group || !areConnected(i, right.i)) && (
              <line x1={w} y1={0} x2={w} y2={h} stroke="black" />
            )}
            {selected[i] && (!bottom.group || !areConnected(i, bottom.i)) && (
              <line x1={0} y1={h} x2={w} y2={h} stroke="black" />
            )}
            <text x={w / 2} y={h / 2} style={{ dominantBaseline: "middle" }}>
              {i}
            </text>
          </g>
        );
      })}
    </>
  );
};
