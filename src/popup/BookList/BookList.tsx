import searchIcon from "../../assets/icons/search.svg";
import filterIcon from "../../assets/icons/filter.svg";
import { useState, useEffect } from "react";
import type { BookPreorder } from "../../types/bookPreorder";
import { getBookPreorders } from "../../services/storage";
import BookItem from "../BookItem/BookItem";
import css from "./BookList.module.css";

type BookListProps = {
  onBack: () => void;
};

function BookList({ onBack }: BookListProps) {
  const [books, setBooks] = useState<BookPreorder[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
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

  const sortedBooks = [...filteredBooks].sort((a, b) => {
    if (!a.preorderDate && !b.preorderDate) return 0;
    if (!a.preorderDate) return 1;
    if (!b.preorderDate) return -1;
    return a.preorderDate.localeCompare(b.preorderDate);
  });

  return (
    <div>
      <div className={css.listHeader}>
        <button type="button" className={css.backButton} onClick={onBack}>
          ← До форми
        </button>

        <div className={css.headerActions}>
          <div className={css.searchWrapper}>
            <button
              type="button"
              className={css.searchButton}
              onClick={() => {
                setIsSearchOpen(!isSearchOpen);
                setIsFilterOpen(false);
              }}
              aria-label="Показати пошук"
            >
              <img src={searchIcon} alt="" />
            </button>

            {isSearchOpen && (
              <input
                className={css.searchInput}
                type="search"
                placeholder="Пошук за назвою"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            )}
          </div>

          <button
            type="button"
            className={css.filterButton}
            onClick={() => {
              setIsFilterOpen(!isFilterOpen);
              setIsSearchOpen(false);
            }}
            aria-label="Показати фільтр"
            aria-expanded={isFilterOpen}
          >
            <img src={filterIcon} alt="" />
          </button>

          {isFilterOpen && (
            <select
              className={css.statusSelect}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              aria-label="Фільтр за статусом"
            >
              <option value="all">Усі</option>
              <option value="saved">Збережені</option>
              <option value="preordered">Передзамовлені</option>
              <option value="completed">Отримані</option>
            </select>
          )}
        </div>
      </div>
      {filteredBooks.length > 0 ? (
        <ul className={css.list}>
          {sortedBooks.map((book) => (
            <BookItem
              key={book.id}
              book={book}
              onDelete={() => {
                setBooks((prevBooks) =>
                  prevBooks.filter((item) => item.id !== book.id),
                );
              }}
            />
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
