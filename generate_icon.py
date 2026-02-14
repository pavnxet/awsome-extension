import struct
import zlib

def write_png(width, height, pixels, filename):
    def chunk(tag, data):
        return struct.pack(">I", len(data)) + tag + data + struct.pack(">I", zlib.crc32(tag + data))

    # PNG Header
    png_sig = b'\x89PNG\r\n\x1a\n'
    
    # IHDR Chunk
    # width, height, bit_depth, color_type, compression, filter, interlace
    ihdr_data = struct.pack(">IIBBBBB", width, height, 8, 2, 0, 0, 0)
    ihdr = chunk(b'IHDR', ihdr_data)

    # IDAT Chunk
    # Pixels are (r, g, b) tuples.
    # Each scanline starts with a filter byte (0).
    scanlines = b""
    for y in range(height):
        scanlines += b'\x00' # Filter byte
        for x in range(width):
            r, g, b = pixels[y * width + x]
            scanlines += struct.pack("BBB", r, g, b)

    compressed_data = zlib.compress(scanlines)
    idat = chunk(b'IDAT', compressed_data)

    # IEND Chunk
    iend = chunk(b'IEND', b"")

    with open(filename, "wb") as f:
        f.write(png_sig)
        f.write(ihdr)
        f.write(idat)
        f.write(iend)

def create_icon(size):
    pixels = []
    # Create a blue circle on white background
    center = size // 2
    radius = size // 2 - 5
    
    for y in range(size):
        for x in range(size):
            # Check if point is inside circle
            if (x - center)**2 + (y - center)**2 <= radius**2:
                # Blue
                pixels.append((0, 123, 255))
            else:
                # White
                pixels.append((255, 255, 255))
    
    write_png(size, size, pixels, f'icons/icon{size}.png')

if __name__ == "__main__":
    create_icon(128)
