import React, { useState } from "react";
import Modal from "react-modal";
import "./App.css";
import { BookToRead, BookRow, BookSearchDialog } from "./components/index";

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

const dummyBooks: BookToRead[] = [
  {
    id: 1,
    title: "はじめてのReact",
    authors: "ダミー",
    memo: "",
  },
  {
    id: 2,
    title: "React Hooks入門",
    authors: "ダミー",
    memo: "",
  },
  {
    id: 3,
    title: "実践Reactアプリケーション開発",
    authors: "ダミー",
    memo: "",
  },
];

const App = (): JSX.Element => {
  const [books, setBooks] = useState(dummyBooks);
  const [modalIsOpen, setModalIsOpen] = useState(false);

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
        <BookSearchDialog /* maxResults={20} */ onBookAdd={(b) => {}} />
      </Modal>
    </div>
  );
};

export default App;
