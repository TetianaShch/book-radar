import { useState, useEffect } from "react";
import type { BookPreorder } from "../../types/bookPreorder";
import { getBookPreorders } from "../../services/storage";
import css from "./BookList.module.css";

type BookListProps = {
  onBack: () => void;
};

function BookList({ onBack }: BookListProps) {
  const [books, setBooks] = useState<BookPreorder[]>([]);

  useEffect(() => {
    const loadBooks = async () => {
      const savedBooks = await getBookPreorders();
      setBooks(savedBooks);
    };

    void loadBooks();
  }, []);

  return (
    <div>
      <button type="button" className={css.backButton} onClick={onBack}>
        ← До форми
      </button>
      <p className={css.count}>Збережено книжок: {books.length}</p>
      <ul className={css.list}>
        {books.map((book) => (
          <li key={book.id} className={css.item}>
            {book.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BookList;
