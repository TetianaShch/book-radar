import BookForm from "./popup/BookForm/BookForm";
import BookList from "./popup/BookList/BookList";

import { useState } from "react";
import "./App.css";

function App() {
  const [currentView, setCurrentView] = useState<"form" | "list">("form");
  return (
    <div>
      <header className="app-header">
        <h1 className="title">BookRadar</h1>

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
    </div>
  );
}

export default App;
