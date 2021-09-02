import "./App.css";
import { Chapter } from "./map/Chapter";
import james from "./data/james.json";

function App() {
  return (
    <div className="App" style={{ height: "100vh" }}>
      <div className="board">
        <svg width="100%" height="100%">
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

export default App;
