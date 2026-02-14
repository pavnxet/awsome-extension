# Awesome Tools Extension

A browser extension that provides a collection of awesome minimal tools accessible from your browser toolbar.

## Features

- **Password Generator**: Generate strong passwords with customizable length and character sets.
- **QR Code Generator**: Create QR codes for any text or URL instantly.
- **Text Tools**:
  - Word and Character Counter.
  - Lorem Ipsum Generator.
- **Converters**:
  - Color Converter (Hex to RGB).
  - Unix Timestamp Converter.

## Installation

1. Clone or download this repository.
2. Open your browser's extensions management page:
   - Chrome/Edge: `chrome://extensions`
   - Firefox: `about:debugging` -> This Firefox
3. Enable "Developer mode" (usually a toggle in the top right corner).
4. Click "Load unpacked" (or "Load Temporary Add-on" in Firefox).
5. Select the directory where you downloaded/cloned this repository.
6. The extension icon should appear in your toolbar.

## Usage

Click the extension icon to open the popup. Use the tabs at the top to switch between different tools.

## Development

- `manifest.json`: Extension configuration.
- `popup.html`: The popup interface.
- `css/popup.css`: Styles.
- `js/popup.js`: Logic for the tools.
- `lib/qrcode.min.js`: QR code generation library.
- `icons/`: Extension icons.

## License

MIT
