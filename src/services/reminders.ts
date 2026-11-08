export async function scheduleBookReminders(
    bookId: string,
    preorderDate: string
): Promise<void> {
    await cancelBookReminders(bookId);
    const morningReminder = new Date(`${preorderDate}T09:00:00`);
    const eveningReminder = new Date(`${preorderDate}T17:00:00`);

    if (morningReminder.getTime() > Date.now()) {
        await chrome.alarms.create(`preorder-${bookId}-morning`, {
            when: morningReminder.getTime(),
        });
    }
    if (eveningReminder.getTime() > Date.now()) {
        await chrome.alarms.create(`preorder-${bookId}-evening`, {
            when: eveningReminder.getTime(),
        });
    }
}

export async function cancelBookReminders(bookId: string): Promise<void> {
    await chrome.alarms.clear(`preorder-${bookId}-morning`);
    await chrome.alarms.clear(`preorder-${bookId}-evening`);

}
