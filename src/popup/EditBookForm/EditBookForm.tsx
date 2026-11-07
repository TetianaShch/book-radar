import { useState } from "react";
import type { BookPreorder } from "../../types/bookPreorder";
import type { SubmitEvent } from "react";
import { updateBookPreorder } from "../../services/storage";
import css from "./EditBookForm.module.css";

type EditBookFormProps = {
  book: BookPreorder;
  onClose: () => void;
  onUpdate: (updatedBook: BookPreorder) => void;
};

function EditBookForm({ book, onClose, onUpdate }: EditBookFormProps) {
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [url, setUrl] = useState(book.url || "");
  const [preorderDate, setPreorderDate] = useState(book.preorderDate || "");
  const [status, setStatus] = useState<BookPreorder["status"]>(book.status);

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const updatedBook: BookPreorder = {
      ...book,
      title,
      author,
      url,
      preorderDate: preorderDate || null,
      status,
    };

    const success = await updateBookPreorder(updatedBook);

    if (success) {
      onClose();
      onUpdate(updatedBook);
    }
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <label htmlFor="title">Назва</label>
      <input
        id="title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <label htmlFor="author">Автор</label>
      <input
        id="author"
        type="text"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <label htmlFor="url">Посилання на магазин</label>
      <input
        id="url"
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <label htmlFor="preorderDate">Передзамовлення діє до</label>
      <input
        id="preorderDate"
        type="date"
        value={preorderDate}
        onChange={(e) => setPreorderDate(e.target.value)}
      />
      <label htmlFor="status">Статус</label>
      <select
        id="status"
        value={status}
        onChange={(e) => setStatus(e.target.value as BookPreorder["status"])}
      >
        <option value="saved">Збережено</option>
        <option value="preordered">Передзамовлено</option>
        <option value="completed">Отримано</option>
      </select>
      <div className={css.actions}>
        <button type="submit">Зберегти</button>
        <button type="button" onClick={onClose}>
          Скасувати
        </button>
      </div>
    </form>
  );
}

export default EditBookForm;
