import { getBookPreorders } from "./services/storage";

chrome.alarms.onAlarm.addListener(async (alarm) => {
    const match = alarm.name.match(/^preorder-(.+)-(morning|evening)$/);

    if (!match) return;
    const bookId = match[1];
    const books = await getBookPreorders();
    const book = books.find((b) => b.id === bookId);
    if (!book || book.status !== "saved") return;
    await chrome.notifications.create({
        type: "basic",
        iconUrl: "icon-128.png",
        title: "BookRadar",
        message: `Сьогодні очікується вихід книжки «${book.title}»! Перевірте її наявність у магазині.`
    });
});




