

export function openBookUrl(url: string) {
    if (!url) return;
    chrome.tabs.create({ url });
}


