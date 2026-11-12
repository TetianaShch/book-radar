import type { ReminderSettings } from "../types/reminderSettings";

export async function scheduleBookReminders(
    bookId: string,
    releaseDate: string,
    settings: ReminderSettings
): Promise<void> {
    await cancelBookReminders(bookId);
    if (!settings.enabled) return;
    const morningReminder = new Date(`${releaseDate}T${settings.morningTime}:00`);
    const eveningReminder = new Date(`${releaseDate}T${settings.eveningTime}:00`);

    if (morningReminder.getTime() > Date.now()) {
        await chrome.alarms.create(`preorder-${bookId}-morning`, {
            when: morningReminder.getTime(),
        });
    }
    if (settings.eveningEnabled && eveningReminder.getTime() > Date.now()) {
        await chrome.alarms.create(`preorder-${bookId}-evening`, {
            when: eveningReminder.getTime(),
        });
    }
}

export async function cancelBookReminders(bookId: string): Promise<void> {
    await chrome.alarms.clear(`preorder-${bookId}-morning`);
    await chrome.alarms.clear(`preorder-${bookId}-evening`);

}
