import type { BookPreorder } from "../../types/bookPreorder";
import calendarIcon from "../../assets/icons/calendar.svg";
import externalLinkIcon from "../../assets/icons/external-link.svg";
import pencilIcon from "../../assets/icons/pencil.svg";
import trashIcon from "../../assets/icons/trash.svg";
import css from "./BookItem.module.css";

type BookItemProps = {
  book: BookPreorder;
};

function BookItem({ book }: BookItemProps) {
  const statusLabels = {
    saved: "Збережено",
    preordered: "Передзамовлено",
    completed: "Отримано",
  };

  const formattedDate = book.preorderDate
    ? book.preorderDate.split("-").reverse().join(".")
    : null;

  return (
    <li className={css.item}>
      <div className={css.header}>
        <div className={css.bookInfo}>
          <h3>{book.title}</h3>
          <p>{book.author}</p>
        </div>

        <span className={css.status}>{statusLabels[book.status]}</span>
      </div>

      {book.preorderDate && (
        <div className={css.date}>
          <img src={calendarIcon} alt="" />
          <span>Передзамовлення до {formattedDate}</span>
        </div>
      )}
      <div className={css.actions}>
        <button type="button" aria-label="Відкрити магазин">
          <img src={externalLinkIcon} alt="" />
        </button>

        <button type="button" aria-label="Редагувати книжку">
          <img src={pencilIcon} alt="" />
        </button>

        <button type="button" aria-label="Видалити книжку">
          <img src={trashIcon} alt="" />
        </button>
      </div>
    </li>
  );
}

export default BookItem;
