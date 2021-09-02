import { blockOf, blockXY } from "../blockMaths";
import { GroupObj } from "./Chapter";

const w = 50;
const h = 50;

interface GridDimension {
  width: number;
  height: number;
}

interface GroupProps {
  group: GroupObj;
  groupDimension?: GridDimension;
  onClick?: (i: number) => any;
  onContextMenu?: (blockNumber: number) => any;
  onMouseDown?: (blockNumber: number) => any;
  onMouseUp?: (blockNumber: number) => any;
  onMouseEnter?: (blockNumber: number) => any;
  onMouseLeave?: (blockNumber: number) => any;
  updateGroup?: (group: GroupObj) => any;
}

const clamp = (value: number, min: number, max: number) =>
  Math.max(min, Math.min(max, value));

export const Group = (props: GroupProps) => {
  const {
    group,
    groupDimension = { width: 2, height: 5 },
    onClick = () => {},
    onContextMenu = () => {},
    onMouseDown = () => {},
    onMouseUp = () => {},
    onMouseEnter = () => {},
    onMouseLeave = () => {},
    updateGroup = () => {},
  } = props;

  const { start, end, fill } = group;

  const editFill = (h: number, s: number, l: number) =>
    updateGroup({
      ...group,
      fill: [
        clamp(fill[0] + h, 0, 360),
        clamp(fill[1] + s, 0, 100),
        clamp(fill[2] + l, 0, 100),
      ],
    });
  const { width, height } = groupDimension;
  const inGroup = (x: number, y: number) => {
    const block = blockOf(x, y, height, width);
    return block >= start && block <= end;
  };

  const blocks = [];
  for (let i = start; i <= end; i++) {
    const block = blockXY(i, height, width);
    const x = w * block.x;
    const y = h * block.y;
    blocks.push(
      <g className={`group-block`} transform={`translate(${x}, ${y})`} key={i}>
        <rect
          width={w}
          height={h}
          style={{ fill: `hsla(${fill[0]}, ${fill[1]}%, ${fill[2]}%, 0.8)` }}
          onWheel={(e) => editFill(e.deltaY, e.deltaX, 0)}
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
        {!inGroup(block.x - 1, block.y) && (
          <line x1={0} y1={0} x2={0} y2={h} stroke="black" />
        )}
        {!inGroup(block.x, block.y - 1) && (
          <line x1={0} y1={0} x2={w} y2={0} stroke="black" />
        )}
        {!inGroup(block.x + 1, block.y) && (
          <line x1={w} y1={0} x2={w} y2={h} stroke="black" />
        )}
        {!inGroup(block.x, block.y + 1) && (
          <line x1={0} y1={h} x2={w} y2={h} stroke="black" />
        )}
      </g>
    );
  }
  return <>{blocks}</>;
};
