import type { ReminderSettings } from "../types/reminderSettings";

export const defaultSettings: ReminderSettings = {
    enabled: false,
    morningTime: "09:00",
    eveningEnabled: true,
    eveningTime: "17:00",
};

export async function getReminderSettings(): Promise<ReminderSettings> {
    const result = await chrome.storage.local.get("reminderSettings");
    return (result.reminderSettings as ReminderSettings | undefined) ?? defaultSettings;
}

export async function saveReminderSettings(
    settings: ReminderSettings
): Promise<void> {
    await chrome.storage.local.set({ reminderSettings: settings });
}
