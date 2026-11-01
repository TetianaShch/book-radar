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
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    const loadBooks = async () => {
      const savedBooks = await getBookPreorders();
      setBooks(savedBooks);
    };

    void loadBooks();
  }, []);

  const filteredBooks = books.filter((book) => {
    const matchesSearch = book.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || book.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const statusLabels = {
    saved: "Збережено",
    preordered: "Передзамовлено",
    completed: "Отримано",
  };
  const sortedBooks = [...filteredBooks].sort((a, b) => {
    if (a.preorderDate && b.preorderDate) return 0;
    if (!a.preorderDate) return 1;
    if (!b.preorderDate) return -1;
    return a.preorderDate.localeCompare(b.preorderDate);
  });

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
      <select
        className={css.statusSelect}
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
      >
        <option value="all">Усі</option>
        <option value="saved">Збережені</option>
        <option value="preordered">Передзамовлені</option>
        <option value="completed">Отримані</option>
      </select>
      {filteredBooks.length > 0 ? (
        <ul className={css.list}>
          {sortedBooks.map((book) => (
            <li key={book.id} className={css.item}>
              <span className={css.bookTitle}>{book.title}</span>
              <span className={css.bookStatus}>
                {statusLabels[book.status]}
              </span>
            </li>
          ))}
        </ul>
      ) : books.length === 0 ? (
        <p>Ви ще не зберегли жодної книжки</p>
      ) : (
        <p>Книжок не знайдено</p>
      )}
    </div>
  );
}

export default BookList;
