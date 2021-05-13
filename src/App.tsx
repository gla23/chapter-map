import { useState } from "react";
import "./App.css";

function App() {
  return (
    <div
      className="App"
      style={{ height: "100vh", backgroundColor: "lightgrey" }}
    >
      <div className="board">
        <svg width="100%" height="100%" fill="lightgrey">
          <Grid />
        </svg>
      </div>
      <h2 style={{ marginTop: 0 }}>Chapter map</h2>
    </div>
  );
}

const blockXY = (i: number, h = 5, w = 2) => ({
  x: ((i - 1) % w) + (Math.ceil(i / (w * h)) - 1) * w,
  y: Math.ceil((((i - 1) % (w * h)) + 1) / w) - 1,
});

interface Block {
  i: number;
  selected: boolean;
}

const blockSelected = (map: Block[][], x: number, y: number): Block => {
  if (!map[x] || !map[x][y]) return { i: -1, selected: false };
  return map[x][y];
};
const toMap = (numbers: boolean[], h?: number, w?: number) => {
  const map: Block[][] = [];
  numbers.forEach((selected, index) => {
    const { x, y } = blockXY(index, h, w);
    if (!map[x]) map[x] = [];
    map[x][y] = { i: index, selected };
  });
  return map;
};
const areConnectedIn =
  (arr: boolean[]) =>
  (a: number, b: number): boolean => {
    const smaller = a < b ? a : b;
    const bigger = a < b ? b : a;
    for (let i = smaller; i < bigger; i++) {
      if (!arr[i]) return false;
    }
    return true;
  };

const Grid = () => {
  const xo = 50;
  const yo = 50;
  const w = 50;
  const h = 60;
  const [selected, setSelected] = useState(() =>
    new Array(37 + 1).fill(false).map((_, i) => i === 3 || (i > 5 && i < 9))
  );
  const areConnected = areConnectedIn(selected);

  const toggleElement = (i: number) => () =>
    setSelected((old) => {
      const copy = old.slice();
      copy[i] = !copy[i];
      return copy;
    });
  const map = toMap(selected, 1000);

  return (
    <>
      {selected.map((v, i) => {
        if (i === 0) return null;
        const block = blockXY(i);
        const blockLong = blockXY(i, 1000);
        const x = xo + w * block.x;
        const y = yo + h * block.y;
        const left = blockSelected(map, blockLong.x - 1, blockLong.y);
        const top = blockSelected(map, blockLong.x, blockLong.y - 1);
        const right = blockSelected(map, blockLong.x + 1, blockLong.y);
        const bottom = blockSelected(map, blockLong.x, blockLong.y + 1);
        return (
          <g
            className={`hover ${selected[i] ? "selected" : ""}`}
            transform={`translate(${x}, ${y})`}
            onClick={toggleElement(i)}
            key={i}
          >
            <rect width={w} height={h} />
            {selected[i] && (!left.selected || !areConnected(i, left.i)) && (
              <line x1={0} y1={0} x2={0} y2={h} stroke="black" />
            )}
            {selected[i] && (!top.selected || !areConnected(i, top.i)) && (
              <line x1={0} y1={0} x2={w} y2={0} stroke="black" />
            )}
            {selected[i] && (!right.selected || !areConnected(i, right.i)) && (
              <line x1={w} y1={0} x2={w} y2={h} stroke="black" />
            )}
            {selected[i] &&
              (!bottom.selected || !areConnected(i, bottom.i)) && (
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

export default App;
