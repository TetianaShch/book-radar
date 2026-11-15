export function openBookUrl(url: string) {
    if (!url) return;

    try {
        const parsedUrl = new URL(url);

        if (
            parsedUrl.protocol !== "https:" &&
            parsedUrl.protocol !== "http:"
        ) {
            return;
        }

        chrome.tabs.create({ url });
    } catch {
        return;
    }
}




