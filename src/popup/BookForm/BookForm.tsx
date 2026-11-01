import { useEffect, useState } from "react";
import type { SubmitEvent } from "react";
import type { BookPreorder } from "../../types/bookPreorder";
import { saveBookPreorder } from "../../services/storage";
import css from "./BookForm.module.css";

type BookFormProps = {
  onSave: () => void;
};

function BookForm({ onSave }: BookFormProps) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [preorderDate, setPreorderDate] = useState("");
  const [url, setUrl] = useState("");

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
      url: url.trim(),
      createdAt: new Date().toISOString(),
      status: "saved",
    };
    const success = await saveBookPreorder(newBook);
    console.log("Book saved:", success);
    if (success) {
      setTitle("");
      setAuthor("");
      setPreorderDate("");
      onSave();
    }
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
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
        Дата дії передзамовлення
      </label>
      <input
        className={css.input}
        type="date"
        id="preorderDate"
        name="preorderDate"
        value={preorderDate}
        onChange={(e) => setPreorderDate(e.target.value)}
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

      <button className={css.button} type="submit">
        Зберегти книжку
      </button>
    </form>
  );
}

export default BookForm;
