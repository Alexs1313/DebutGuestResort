export function generatePassId(): string {
  const digits = Math.floor(1000 + Math.random() * 9000);
  return `DGR-${digits}`;
}
