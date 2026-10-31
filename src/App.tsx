import BookForm from "./popup/BookForm/BookForm";
import BookList from "./popup/BookList/BookList";

import { useState } from "react";
import "./App.css";

function App() {
  const [currentView, setCurrentView] = useState<"form" | "list">("form");
  return (
    <div>
      <h1 className="title">BookRadar</h1>
      {currentView === "form" ? (
        <BookForm onSave={() => setCurrentView("list")} />
      ) : (
        <BookList />
      )}
    </div>
  );
}

export default App;
