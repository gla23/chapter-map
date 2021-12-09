export const boxXY = (i: number, h = 5, w = 2): { x: number; y: number } => ({
  x: ((i - 1) % w) + (Math.ceil(i / (w * h)) - 1) * w,
  y: Math.ceil((((i - 1) % (w * h)) + 1) / w) - 1,
});

export const boxXYFloat = (
  i: number,
  h = 5,
  w = 2
): { x: number; y: number; o: number } => {
  const fraction = i - Math.floor(i);
  const from = boxXY(Math.floor(i), 100000, w);
  const to = boxXY(Math.ceil(i), 100000, w);

  const xInfinite = from.x * (1 - fraction) + to.x * fraction;
  const yInfinite = from.y * (1 - fraction) + to.y * fraction;
  const columnsAlong = Math.max(0, Math.floor((yInfinite + 0.5) / h));

  const x = xInfinite + columnsAlong * w;
  const y = yInfinite - columnsAlong * h;
  const o = Math.min(2 * y + 1, 1 - 2 * (y - (h - 1)), 1);

  return { x, y, o };
};
export const boxOf = (x: number, y: number, h = 5, w = 2) =>
  w * h * Math.floor(x / w) + w * y + (x % w) + 1;

export const mapBoxWidth = (i: number, h = 5, w = 2) => 6;
export const mapBoxHeight = (i: number, h = 5, w = 2) => 5;
