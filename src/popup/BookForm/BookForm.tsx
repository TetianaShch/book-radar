import { useEffect, useState } from "react";
import type { SubmitEvent } from "react";
import type { BookPreorder } from "../../types/bookPreorder";
import { saveBookPreorder } from "../../services/storage";
import css from "./BookForm.module.css";

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
    if (success) {
      setTitle("");
      setAuthor("");
      setPreorderDate("");
      setReleaseDate("");
      setIsOrdered(false);
    }
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <h2 className={css.title}>Додати книжку</h2>
      <label className={css.label} htmlFor="title">
        Назва книжки
      </label>
      <input
        className={css.input}
        type="text"
        id="title"
        name="title"
        value={title}
        required
        onChange={(e) => setTitle(e.target.value)}
      />

      <label className={css.label} htmlFor="author">
        Автор
      </label>
      <input
        className={css.input}
        type="text"
        id="author"
        name="author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />

      <label className={css.label} htmlFor="preorderDate">
        Дата передзамовлення
      </label>
      <input
        className={css.input}
        type="date"
        id="preorderDate"
        name="preorderDate"
        value={preorderDate}
        onChange={(e) => setPreorderDate(e.target.value)}
      />

      <label className={css.label} htmlFor="releaseDate">
        Дата виходу книжки
      </label>
      <input
        className={css.input}
        type="date"
        id="releaseDate"
        name="releaseDate"
        value={releaseDate}
        onChange={(e) => setReleaseDate(e.target.value)}
      />

      <label className={css.label} htmlFor="url">
        Посилання на книжку
      </label>
      <input
        className={css.input}
        type="url"
        id="url"
        name="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <label className={css.checkboxLabel} htmlFor="isOrdered">
        <input
          className={css.checkbox}
          type="checkbox"
          id="isOrdered"
          name="isOrdered"
          checked={isOrdered}
          onChange={(e) => setIsOrdered(e.target.checked)}
        />
        Уже передзамовлено
      </label>

      <button className={css.button} type="submit">
        Зберегти книжку
      </button>
    </form>
  );
}

export default BookForm;
