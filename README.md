# BookRadar

**BookRadar** is a Chrome extension that helps readers organize book pre-orders, track release dates, and receive timely reminders.

Built with React, TypeScript, Vite, and Chrome Extensions API (Manifest V3).

## Features

- Save books with titles, authors, pre-order dates, release dates, and store links.
- Automatically fill in the book title and URL from the active browser tab.
- Retrieve book cover images from supported websites.
- Track book statuses: Saved, Preordered, and Completed.
- Edit and delete saved books.
- Search books by title and filter by status.
- Sort books by upcoming pre-order dates.
- Open saved book links directly from the extension.
- Receive Chrome notifications based on book release dates, even when the popup is closed.
- Enable or disable reminders and customize morning and evening notification times.
- Store books and reminder settings locally using Chrome Storage API.

## Tech Stack

- React
- TypeScript
- Vite
- Chrome Extensions API (Manifest V3)
- CSS Modules
- Chrome Storage, Alarms, Notifications, Tabs, and Scripting APIs

## Getting Started

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/TetianaShch/book-radar.git
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

1. Open `chrome://extensions/`.
2. Enable **Developer mode**.
3. Click **Load unpacked**.
4. Select the `dist` folder.

## Project Status

**MVP 1.0 — Release Preparation**

The core functionality is implemented and has passed initial manual testing, including book management, search, filtering, local storage, and Chrome notifications.

The extension is being prepared for publication in the Chrome Web Store.

## Roadmap

- [x] Initialize React + TypeScript + Vite
- [x] Configure Manifest V3
- [x] Load extension into Chrome
- [x] Implement book data types and local storage
- [x] Build popup interface
- [x] Implement CRUD operations
- [x] Add sorting and book statuses
- [x] Implement search and status filtering
- [x] Retrieve book covers from supported websites
- [x] Implement configurable Chrome notifications
- [x] Test core functionality and notifications
- [x] Pass build and lint checks
- [ ] Prepare Chrome Web Store assets and listing
- [ ] Publish version 1.0

## Author

Tetiana Shcherbyna
