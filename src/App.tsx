import BookForm from "./popup/BookForm/BookForm";
import BookList from "./popup/BookList/BookList";
import { ReminderModal } from "./popup/ReminderModal/ReminderModal";

import { useState } from "react";
import bellIcon from "./assets/icons/bell.svg";
import "./App.css";

function App() {
  const [currentView, setCurrentView] = useState<"form" | "list">("form");
  const [isReminderOpen, setIsReminderOpen] = useState(false);

  return (
    <div>
      <header className="app-header">
        <h1 className="title">BookRadar</h1>
        {currentView === "list" && (
          <button
            type="button"
            aria-label="Налаштування нагадувань"
            onClick={() => setIsReminderOpen(true)}
          >
            <img src={bellIcon} alt="" width={22} height={22} />
          </button>
        )}
        {currentView === "form" && (
          <button
            className="saved-button"
            type="button"
            onClick={() => setCurrentView("list")}
          >
            Збережені
          </button>
        )}
      </header>
      {currentView === "form" ? (
        <BookForm onSave={() => setCurrentView("list")} />
      ) : (
        <BookList onBack={() => setCurrentView("form")} />
      )}

      <ReminderModal
        isOpen={isReminderOpen}
        onClose={() => setIsReminderOpen(false)}
      />
    </div>
  );
}

export default App;
