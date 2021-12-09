import "./App.css";
import { GroupObj } from "./map/Chapter";
import jamesData from "./data/james.json";
import { BoxMap, Renderable } from "./box/BoxMap";
import { useState } from "react";

const james = jamesData as GroupObj[][];
function App() {
  const [position, setPosition] = useState(3.5);
  return (
    <div className="app">
      <p>This is a chapter map. It is a visual representation of a list.</p>
      <div
        className="text-center shadow"
        style={{ width: 300, margin: "auto" }}
      >
        <BoxMap width={300} height={200} size={27}>
          {({ positioner, boxes }) => {
            const pos = positioner(position);
            return (
              <>
                {boxes.map((box, i) => (
                  <div
                    key={i}
                    style={{
                      ...box,
                      lineHeight: box.height + "px",
                    }}
                  >
                    {i + 1}
                  </div>
                ))}
                <div
                  style={{
                    ...pos,
                    lineHeight: pos.height + "px",
                    backgroundColor: "lightgrey",
                  }}
                >
                  gg
                </div>
              </>
            );
          }}
        </BoxMap>
      </div>
      <br />
      <input
        type="range"
        style={{ width: "100%" }}
        min={1}
        max={30}
        step={0.02}
        value={position}
        onChange={(e) => setPosition(Number(e.target.value))}
      />
      {position}
      <p>
        Each number has a consistent location. This means that you can look at a
        shape, and with a little practice, instantly know the numbers it
        represents.
      </p>
      <div className="map shadow">
        <ToDoText>
          Animate the block changing position :O The numbers can fade in when
          the block is over that area
        </ToDoText>
      </div>
      <p>Let's look at an example.</p>
      <ToDoText>
        <p>Then build up the James example a block at a time?</p>
        <p>
          How to display the james text side by side with a block? Involve
          scroll?
        </p>
      </ToDoText>
    </div>
  );
}

const ToDoText = (props: { children: Renderable }) => (
  <div style={{ padding: "24px", color: "lightgrey" }}>{props.children}</div>
);
export default App;
