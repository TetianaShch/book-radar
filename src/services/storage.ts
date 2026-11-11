import type { BookPreorder } from '../types/bookPreorder';
import { cancelBookReminders, scheduleBookReminders } from "./reminders";

export async function getBookPreorders(): Promise<BookPreorder[]> {
    const result = await chrome.storage.local.get('bookPreorders');
    return (result.bookPreorders as BookPreorder[] | undefined) ?? [];
}

export async function getBookImage(): Promise<string | null> {
    const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
    });
    if (!tab?.id) {
        return null;
    }
    try {
        const results = await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: () => {
                const imageMeta = document.querySelector<HTMLMetaElement>(
                    'meta[property="og:image"]'
                );
                return imageMeta?.content || null;
            },
        });
        return results[0]?.result ?? null;
    }
    catch (error) {
        console.error('Error getting book image:', error);
        return null;
    }
}

export async function saveBookPreorder(book: BookPreorder): Promise<"success" | "duplicate" | "error"> {

    try {
        const bookPreorders = await getBookPreorders();
        if (
            bookPreorders.some(
                (b) => b.id === book.id || (book.url && b.url === book.url)
            )
        ) {
            return "duplicate";
        }
        bookPreorders.push(book);
        await chrome.storage.local.set({ bookPreorders });
        return "success";
    }
    catch (error) {
        console.error('Error saving book preorder:', error);
        return "error";
    }
}

export async function deleteBookPreorder(bookID: string): Promise<boolean> {
    try {
        const bookPreorders = await getBookPreorders();
        const updatedBookPreorders = bookPreorders.filter((b) => b.id !== bookID);
        if (updatedBookPreorders.length === bookPreorders.length) {
            return false;
        }
        await chrome.storage.local.set({ bookPreorders: updatedBookPreorders });
        await cancelBookReminders(bookID);
        return true;
    }
    catch (error) {
        console.error('Error deleting book preorder:', error);
        return false;
    }
}

export async function updateBookPreorder(book: BookPreorder): Promise<boolean> {
    try {
        const bookPreorders = await getBookPreorders();
        const index = bookPreorders.findIndex((b) => b.id === book.id);
        if (index === -1) {
            return false;
        }

        bookPreorders[index] = book;
        await chrome.storage.local.set({ bookPreorders });
        await cancelBookReminders(book.id);
        if (book.releaseDate && book.status === "saved") {
            await scheduleBookReminders(book.id, book.releaseDate);
        }
        return true;
    }
    catch (error) {
        console.error('Error updating book preorder:', error);
        return false;
    }
}
