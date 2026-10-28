**BookRadar** is a Chrome extension designed to help readers track book pre-orders and upcoming release dates.

Built with React, TypeScript, Vite, and Chrome Extensions API (Manifest V3).

## Features (Planned)

- Save books and their pre-order dates.
- Track upcoming book releases.
- Mark books as ordered or not ordered.
- Edit and delete saved books.
- Sort books by upcoming pre-order dates.
- Receive browser notifications when pre-orders become available.
- Store book data locally using Chrome Storage API.

## Tech Stack

- React
- TypeScript
- Vite
- Chrome Extensions API (Manifest V3)
- CSS

## Getting Started

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/tetianashcherbyna/book-radar.git
   ```

2. Navigate to the project directory:

   ```bash
   cd book-radar
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Build the extension:

   ```bash
   npm run build
   ```

### Load into Chrome

1. Open `chrome://extensions`.
2. Enable **Developer mode**.
3. Click **Load unpacked**.
4. Select the `dist` folder.

## Project Status

**MVP 1.0 — In Development**

The initial React, TypeScript, and Manifest V3 setup is complete. The extension can be loaded into Chrome and displays a basic popup.

## Roadmap

- [x] Initialize React + TypeScript + Vite
- [x] Configure Manifest V3
- [x] Load extension into Chrome
- [ ] Implement book data types and local storage
- [ ] Build popup interface
- [ ] Implement CRUD operations
- [ ] Add sorting and order status
- [ ] Implement notifications
- [ ] Test and prepare for release

## Author

Tetiana Shcherbyna
