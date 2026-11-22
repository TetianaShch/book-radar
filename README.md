# BookRadar

**BookRadar** is a Chrome extension that helps readers organize book pre-orders, track release dates, and receive timely reminders.

[Install BookRadar from the Chrome Web Store](https://chromewebstore.google.com/detail/bookradar/lfagoeciddiceojmiijflmdommhgfndd)

Built with React, TypeScript, Vite, and Chrome Extensions API (Manifest V3).

## Features

- Save books with titles, authors, pre-order dates, release dates, and store links.
- Automatically fill in the book title and URL from the active browser tab.
- Retrieve book cover images from the active page's Open Graph metadata when available.
- Track book statuses: Saved, Preordered, and Completed.
- Edit and delete saved books.
- Search books by title and filter by status.
- Sort books by upcoming pre-order dates.
- Open saved book links directly from the extension.
- Receive Chrome notifications based on book release dates, even when the popup is closed.
- Enable or disable reminders and customize morning and evening notification times.
- Store books and reminder settings locally using Chrome Storage API.

## What's New in v1.1.0

- Save the price you paid for a pre-order and see it next to the Preordered status.
- Books without a pre-order date are now sorted by release date.
- Upload your own cover when editing a saved book.
- A placeholder appears when a cover is missing or fails to load.
- BookRadar can now automatically find covers on more book pages.

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

BookRadar 1.1.0 has been submitted for Chrome Web Store review. Version 1.0.0 is currently available to install.

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
- [x] Add privacy policy document
- [x] Add extension icons
- [x] Prepare Chrome Web Store listing screenshots
- [x] Publish BookRadar 1.0.0 in the Chrome Web Store

## Privacy Policy

See [Privacy Policy](docs/privacy-policy.md).

## Author

Tetiana Shcherbyna
