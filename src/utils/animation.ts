export function easeOutCubic(val: number, x: number, y: number): number {
  return y * ((val = val / x - 1) * val * val + 1);
}
