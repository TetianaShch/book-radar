import { useState } from "react";
import type { BookPreorder } from "../../types/bookPreorder";
import { openBookUrl } from "../../services/tabs";
import { deleteBookPreorder } from "../../services/storage";
import Modal from "../Modal/Modal";
import EditBookForm from "../EditBookForm/EditBookForm";
import calendarIcon from "../../assets/icons/calendar.svg";
import externalLinkIcon from "../../assets/icons/external-link.svg";
import pencilIcon from "../../assets/icons/pencil.svg";
import trashIcon from "../../assets/icons/trash.svg";
import css from "./BookItem.module.css";

type BookItemProps = {
  book: BookPreorder;
  onDelete: () => void;
};

function BookItem({ book, onDelete }: BookItemProps) {
  const statusLabels = {
    saved: "Збережено",
    preordered: "Передзамовлено",
    completed: "Отримано",
  };

  const formattedDate = book.preorderDate
    ? book.preorderDate.split("-").reverse().join(".")
    : null;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDelete = async () => {
    await deleteBookPreorder(book.id);
    setIsDeleteModalOpen(false);
    onDelete();
  };

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
        <button
          type="button"
          aria-label="Відкрити магазин"
          onClick={() => openBookUrl(book.url)}
          disabled={!book.url}
        >
          <img src={externalLinkIcon} alt="" />
        </button>

        <button
          type="button"
          aria-label="Редагувати книжку"
          onClick={() => setIsModalOpen(true)}
        >
          <img src={pencilIcon} alt="" />
        </button>

        <button
          type="button"
          aria-label="Видалити книжку"
          onClick={() => setIsDeleteModalOpen(true)}
        >
          <img src={trashIcon} alt="" />
        </button>
      </div>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2>Редагування книжки</h2>
        <EditBookForm book={book} onClose={() => setIsModalOpen(false)} />
      </Modal>
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
      >
        <h2>Видалити книжку?</h2>
        <p>Ви впевнені, що хочете видалити «{book.title}»?</p>
        <div className={css.deleteActions}>
          <button type="button" onClick={() => setIsDeleteModalOpen(false)}>
            Скасувати
          </button>

          <button type="button" onClick={handleDelete}>
            Видалити
          </button>
        </div>
      </Modal>
    </li>
  );
}

export default BookItem;
