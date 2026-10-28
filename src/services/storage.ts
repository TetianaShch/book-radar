import type { BookPreorder } from '../types/bookPreorder';

export async function getBookPreorders(): Promise<BookPreorder[]> {
    const result = await chrome.storage.local.get('bookPreorders');
    return (result.bookPreorders as BookPreorder[] | undefined) ?? [];
}

export async function saveBookPreorder(book: BookPreorder): Promise<boolean> {

    try {
        const bookPreorders = await getBookPreorders();
        if (bookPreorders.some((b) => b.id === book.id)) {
            return false;
        }
        bookPreorders.push(book);
        await chrome.storage.local.set({ bookPreorders });
        return true;
    }
    catch (error) {
        console.error('Error saving book preorder:', error);
        return false;
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
        return true;
    }
    catch (error) {
        console.error('Error updating book preorder:', error);
        return false;
    }
}
