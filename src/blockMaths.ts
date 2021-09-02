export const blockXY = (i: number, h = 5, w = 2): { x: number; y: number; } => ({
  x: ((i - 1) % w) + (Math.ceil(i / (w * h)) - 1) * w,
  y: Math.ceil((((i - 1) % (w * h)) + 1) / w) - 1,
});
export const blockOf = (x: number, y: number, h = 5, w = 2) => w * h * Math.floor(x / w) + w * y + (x % w) + 1;
