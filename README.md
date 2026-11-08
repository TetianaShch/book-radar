**BookRadar** is a Chrome extension designed to help readers track book pre-orders and manage their book wishlists.

Built with React, TypeScript, Vite, and Chrome Extensions API (Manifest V3).

## Features

- Save books with their pre-order dates and store links.
- Automatically fill in the book title and URL from the active browser tab.
- Track book statuses: Saved, Preordered, and Completed.
- Edit and delete saved books.
- Sort books by upcoming pre-order dates.
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
   git clone https://github.com/TetianaShch/book-radar
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

The core functionality is implemented, including adding, editing, deleting, and sorting books, managing book statuses, and local data storage.

The next steps are implementing Chrome notifications, completing final testing, and preparing the extension for publication in the Chrome Web Store.

## Roadmap

- [x] Initialize React + TypeScript + Vite
- [x] Configure Manifest V3
- [x] Load extension into Chrome
- [x] Implement book data types and local storage
- [x] Build popup interface
- [x] Implement CRUD operations
- [x] Add sorting and book statuses
- [ ] Implement notifications
- [ ] Test and prepare for release

## Author

Tetiana Shcherbyna
