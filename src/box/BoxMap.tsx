import { boxXY, boxXYFloat, mapBoxHeight, mapBoxWidth } from "./boxMaths";

export type Renderable = string | number | JSX.Element | null | Renderable[];

interface Position {
  position: "absolute";
  left: number;
  top: number;
  width: number;
  height: number;
  opacity: number;
}
type Positioner = (location: number) => Position;
type RenderProp = (paramteres: RenderParameters) => Renderable | Renderable[];
interface BoxMapProps {
  width: number; // Perhaps this should be a width per box? Could easily calculate that tho :)
  height: number;
  size: number;
  children: RenderProp | (RenderProp | Renderable)[];
}

interface RenderParameters {
  positioner: Positioner;
  boxes: Position[];
}

export const BoxMap = (props: BoxMapProps) => {
  const boxWidth = mapBoxWidth(props.size);
  const boxHeight = mapBoxHeight(props.size);
  // Add a dimensions to allow % width and height?
  // https://github.com/DZakh-packages/react-hook-dimensions#readme
  const positioner = (location: number): Position => {
    const xy = boxXYFloat(location);
    const width = props.width / boxWidth;
    const height = props.height / boxHeight;
    return {
      position: "absolute",
      left: xy.x * width,
      top: xy.y * height,
      width,
      height,
      opacity: xy.o,
    };
  };
  const boxes = Array.from(new Array(27)).map((_, i) => positioner(i + 1));
  const renderPropArgs: RenderParameters = { positioner, boxes };
  return (
    <div
      className="box-map"
      style={{ position: "relative", width: props.width, height: props.height }}
    >
      {Array.isArray(props.children)
        ? props.children.map((child) =>
            child instanceof Function ? child(renderPropArgs) : child
          )
        : props.children(renderPropArgs)}
    </div>
  );
};
