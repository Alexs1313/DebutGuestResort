import qrcode from 'qrcode-generator';

export function createQrMatrix(value: string): boolean[][] {
  const qr = qrcode(0, 'M');
  qr.addData(value);
  qr.make();

  const moduleCount = qr.getModuleCount();
  const matrix: boolean[][] = [];

  for (let row = 0; row < moduleCount; row += 1) {
    const nextRow: boolean[] = [];
    for (let col = 0; col < moduleCount; col += 1) {
      nextRow.push(qr.isDark(row, col));
    }
    matrix.push(nextRow);
  }

  return matrix;
}
