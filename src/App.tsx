import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import "./App.css";
import {
  BookToRead,
  BookDescription,
  BookRow,
  BookSearchDialog,
} from "./components/index";

const APP_KEY = "react-hooks-tutorial";

Modal.setAppElement("#root");

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    padding: 0,
    transform: "translate(-50%, -50%)",
  },
};

const App = (): JSX.Element => {
  const [books, setBooks] = useState([] as BookToRead[]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const storedBooks = localStorage.getItem(APP_KEY);
    if (storedBooks) {
      setBooks(JSON.parse(storedBooks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(APP_KEY, JSON.stringify(books));
  }, [books]);

  // 削除ボタン
  const handleBookDelete = (id: number) => {
    const newBooks = books.filter((b) => b.id !== id);
    setBooks(newBooks);
  };

  // メモ入力
  const handleBookMemoChange = (id: number, memo: string) => {
    const newBooks = books.map((b) => (b.id === id ? { ...b, memo } : b));
    setBooks(newBooks);
  };

  // モーダルを開く
  const handleAddClick = () => {
    setModalIsOpen(true);
  };

  // モーダルを閉じる
  const handleModalClose = () => {
    setModalIsOpen(false);
  };

  const handleBookAdd = (book: BookDescription) => {
    const newBook: BookToRead = { ...book, id: Date.now(), memo: "" };
    const newBooks = [...books, newBook];
    setBooks(newBooks);
    setModalIsOpen(false);
  };

  const bookRows = books.map((b) => (
    <BookRow
      book={b}
      key={b.id}
      onMemoChange={(id, memo) => handleBookMemoChange(id, memo)}
      onDelete={(id) => handleBookDelete(id)}
    />
  ));

  return (
    <div className="App">
      <section className="nav">
        <h1>読みたい本リスト</h1>
        <button type="button" className="button-like" onClick={handleAddClick}>
          本を追加
        </button>
      </section>
      <main className="main">{bookRows}</main>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleModalClose}
        style={customStyles}
      >
        <BookSearchDialog maxResults={20} onBookAdd={handleBookAdd} />
      </Modal>
    </div>
  );
};

export default App;
