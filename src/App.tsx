import "./App.css";
import { Chapter, GroupObj } from "./map/Chapter";
import jamesData from "./data/james.json";

const james = jamesData as GroupObj[][];
function App() {
  return (
    <div className="App" style={{ height: "100vh" }}>
      <div className="board">
        <svg width="100%" height="100%">
          <g transform={`translate(50, 50)`}>
            <Chapter length={27} groups={james[0]} />
          </g>
          <g transform={`translate(400, 50)`}>
            <Chapter length={26} groups={james[1]} />
          </g>
          <g transform={`translate(50, 350)`}>
            <Chapter length={18} groups={james[2]} />
          </g>
          <g transform={`translate(275, 350)`}>
            <Chapter length={17} groups={james[3]} />
          </g>
          <g transform={`translate(500, 350)`}>
            <Chapter length={20} groups={james[4]} />
          </g>
        </svg>
      </div>
      <h2 style={{ marginTop: 0 }}>Chapter map</h2>
    </div>
  );
}

export default App;
