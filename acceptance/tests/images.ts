import { deflateSync } from 'node:zlib';

const CRC_TABLE = Array.from({ length: 256 }, (_, n) => {
  let c = n;
  for (let k = 0; k < 8; k++) {
    c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  }
  return c >>> 0;
});

function crc32(buffer: Buffer) {
  let crc = 0xffffffff;
  for (const byte of buffer) {
    crc = CRC_TABLE[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function chunk(type: string, data: Buffer) {
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(body));
  return Buffer.concat([length, body, crc]);
}

/**
 * Builds an RGB PNG of the given size, with a gradient so that crops,
 * rotations and colour adjustments all change the pixels.
 */
export function makePNG(width: number, height: number) {
  const header = Buffer.alloc(13);
  header.writeUInt32BE(width, 0);
  header.writeUInt32BE(height, 4);
  header[8] = 8; // bit depth
  header[9] = 2; // colour type: RGB
  const rowLength = width * 3 + 1;
  const pixels = Buffer.alloc(rowLength * height);
  for (let y = 0; y < height; y++) {
    pixels[y * rowLength] = 0; // filter: none
    for (let x = 0; x < width; x++) {
      const offset = y * rowLength + 1 + x * 3;
      pixels[offset] = Math.round((255 * x) / width);
      pixels[offset + 1] = Math.round((255 * y) / height);
      pixels[offset + 2] = 128;
    }
  }
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', header),
    chunk('IDAT', deflateSync(pixels)),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

/** A PNG ready for `setInputFiles`. */
export function pngFile(width: number, height: number, name = 'image.png') {
  return { name, mimeType: 'image/png', buffer: makePNG(width, height) };
}
