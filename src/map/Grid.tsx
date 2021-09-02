import React from "react";
import { blockXY } from "../blockMaths";
import "./Map.css";

const w = 50;
const h = 50;

interface GridProps {
  length?: number;
  onClick?: (blockNumber: number) => any;
  onContextMenu?: (blockNumber: number) => any;
  onMouseDown?: (blockNumber: number) => any;
  onMouseUp?: (blockNumber: number) => any;
  onMouseEnter?: (blockNumber: number) => any;
  onMouseLeave?: (blockNumber: number) => any;
}
export const Grid: React.FunctionComponent<GridProps> = (props) => {
  const {
    length = 27,
    onClick = () => {},
    onContextMenu = () => {},
    onMouseDown = () => {},
    onMouseUp = () => {},
    onMouseEnter = () => {},
    onMouseLeave = () => {},
  } = props;

  return (
    <>
      {new Array(length + 1).fill(undefined).map((v, i) => {
        if (i === 0) return null;
        const block = blockXY(i);
        const x = w * block.x;
        const y = h * block.y;
        return (
          <g
            className={`grid-block`}
            transform={`translate(${x}, ${y})`}
            key={i}
          >
            <text x={w / 2} y={h / 2} style={{ dominantBaseline: "middle" }}>
              {i}
            </text>
            <rect
              width={w}
              height={h}
              onClick={() => onClick(i)}
              onMouseDown={() => onMouseDown(i)}
              onMouseUp={() => onMouseUp(i)}
              onMouseEnter={() => onMouseEnter(i)}
              onMouseLeave={() => onMouseLeave(i)}
              onContextMenu={(e) => {
                e.preventDefault();
                onContextMenu(i);
              }}
            />
          </g>
        );
      })}
    </>
  );
};
