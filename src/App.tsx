import "./App.css";
import { Chapter } from "./Chapter";
import { OldGrid } from "./OldGrid";

function App() {
  return (
    <div
      className="App"
      style={{ height: "100vh", backgroundColor: "lightgrey" }}
    >
      <div className="board">
        <svg width="100%" height="100%" fill="lightgrey">
          <g transform={`translate(50, 50)`}>
            <OldGrid />
          </g>
          <g transform={`translate(450, 50)`}>
            <Chapter />
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
