import { getBookPreorders } from "./storage";
import { getReminderSettings } from "./settings";
import {
    scheduleBookReminders,
    cancelBookReminders,
} from "./reminders";


export async function syncReminders(): Promise<void> {
    const books = await getBookPreorders();
    const settings = await getReminderSettings();

    for (const book of books) {
        if (!book.releaseDate || book.status === "completed") {
            await cancelBookReminders(book.id);
            continue;
        }

        await scheduleBookReminders(book.id, book.releaseDate, settings);
    }
}
