import "./App.css";
import { Chapter } from "./map/Chapter";
import { OldGrid } from "./OldGrid";
import james from "./data/james.json";

function App() {
  return (
    <div className="App" style={{ height: "100vh" }}>
      <div className="board">
        <svg width="100%" height="100%">
          <g transform={`translate(5000, 50)`}>
            <OldGrid />
          </g>
          <g transform={`translate(50, 50)`}>
            <Chapter length={27} groups={james[0] as any} />
          </g>
          <g transform={`translate(400, 50)`}>
            <Chapter length={26} groups={james[1] as any} />
          </g>
          <g transform={`translate(50, 350)`}>
            <Chapter length={18} groups={james[2] as any} />
          </g>
          <g transform={`translate(275, 350)`}>
            <Chapter length={17} groups={james[3] as any} />
          </g>
          <g transform={`translate(500, 350)`}>
            <Chapter length={20} groups={james[4] as any} />
          </g>
        </svg>
      </div>
      <h2 style={{ marginTop: 0 }}>Chapter map</h2>
    </div>
  );
}

// Add classes to make css easy
//   hover for square
//   hover for group
// add x
// color wheel
// make nice animated hover expand thing

export interface GridDimention {
  width: number;
  height: number;
}
export const blockXY = (i: number, h = 5, w = 2) => ({
  x: ((i - 1) % w) + (Math.ceil(i / (w * h)) - 1) * w,
  y: Math.ceil((((i - 1) % (w * h)) + 1) / w) - 1,
});
export const blockOf = (x: number, y: number, h = 5, w = 2) =>
  w * h * Math.floor(x / w) + w * y + (x % w) + 1;

export default App;
