import { useState, useEffect } from "react";
import type { BookPreorder } from "../../types/bookPreorder";
import { getBookPreorders } from "../../services/storage";
import css from "./BookList.module.css";

type BookListProps = {
  onBack: () => void;
};

function BookList({ onBack }: BookListProps) {
  const [books, setBooks] = useState<BookPreorder[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const loadBooks = async () => {
      const savedBooks = await getBookPreorders();
      setBooks(savedBooks);
    };

    void loadBooks();
  }, []);

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div>
      <button type="button" className={css.backButton} onClick={onBack}>
        ← До форми
      </button>
      <p className={css.count}>Збережено книжок: {books.length}</p>
      <input
        className={css.searchInput}
        type="search"
        placeholder="Пошук за назвою"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {filteredBooks.length > 0 ? (
        <ul className={css.list}>
          {filteredBooks.map((book) => (
            <li key={book.id} className={css.item}>
              {book.title}
            </li>
          ))}
        </ul>
      ) : books.length === 0 ? (
        <p>Ви ще не зберегли жодної книжки</p>
      ) : (
        <p>Книжок за вашим запитом не знайдено</p>
      )}
    </div>
  );
}

export default BookList;
