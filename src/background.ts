import { getBookPreorders } from "./services/storage";

console.log("BookRadar service worker started");


chrome.alarms.onAlarm.addListener(async (alarm) => {
    console.log("Alarm triggered:", alarm.name);
    const match = alarm.name.match(/^preorder-(.+)-(morning|evening)$/);

    if (!match) return;
    const bookId = match[1];
    const books = await getBookPreorders();
    const book = books.find((b) => b.id === bookId);
    if (!book || book.status !== "saved") return;
    const notificationId = await chrome.notifications.create({
        type: "basic",
        iconUrl: "icon-128.png",
        title: "BookRadar",
        message: `Сьогодні починається передзамовлення: ${book.title}`,
    });
    console.log("Notification created:", notificationId);
});




