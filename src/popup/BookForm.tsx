import { useEffect, useState } from "react";
import type { SubmitEvent } from "react";
import type { BookPreorder } from "../types/bookPreorder";
import { saveBookPreorder } from "../services/storage";

function BookForm() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [preorderDate, setPreorderDate] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [url, setUrl] = useState("");
  const [isOrdered, setIsOrdered] = useState(false);

  useEffect(() => {
    const getCurrentTab = async () => {
      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });

      if (tab?.url) {
        setUrl(tab.url);
      }
    };

    void getCurrentTab();
  }, []);

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newBook: BookPreorder = {
      id: crypto.randomUUID(),
      title: title.trim(),
      author: author.trim(),
      preorderDate: preorderDate || null,
      releaseDate: releaseDate || null,
      url: url.trim(),
      createdAt: new Date().toISOString(),
      isOrdered,
    };
    const success = await saveBookPreorder(newBook);
    console.log("Book saved:", success);
    // Handle form submission logic here
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Додати книжку</h2>
      <label htmlFor="title">Назва книжки</label>
      <input
        type="text"
        id="title"
        name="title"
        value={title}
        required
        onChange={(e) => setTitle(e.target.value)}
      />

      <label htmlFor="author">Автор</label>
      <input
        type="text"
        id="author"
        name="author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />

      <label htmlFor="preorderDate">Дата початку передзамовлення</label>
      <input
        type="date"
        id="preorderDate"
        name="preorderDate"
        value={preorderDate}
        onChange={(e) => setPreorderDate(e.target.value)}
      />

      <label htmlFor="releaseDate">Дата виходу книжки</label>
      <input
        type="date"
        id="releaseDate"
        name="releaseDate"
        value={releaseDate}
        onChange={(e) => setReleaseDate(e.target.value)}
      />

      <label htmlFor="url">Посилання на книжку</label>
      <input
        type="url"
        id="url"
        name="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <label htmlFor="isOrdered">
        <input
          type="checkbox"
          id="isOrdered"
          name="isOrdered"
          checked={isOrdered}
          onChange={(e) => setIsOrdered(e.target.checked)}
        />
        Уже замовлено
      </label>

      <button type="submit">Зберегти книжку</button>
    </form>
  );
}

export default BookForm;
