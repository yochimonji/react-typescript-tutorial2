import React from "react";
import "./App.css";
import { BookToRead, BookRow } from "./components/index";

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
  const bookRows = dummyBooks.map((b) => (
    <BookRow
      book={b}
      key={b.id}
      onMemoChange={(id, memo) => {
        const a = 1;
      }}
      onDelete={(id) => {
        const a = 1;
      }}
    />
  ));

  return (
    <div className="App">
      <section className="nav">
        <h1>読みたい本リスト</h1>
        <div className="button-like">本を追加</div>
      </section>
      <main className="main">{bookRows}</main>
    </div>
  );
};

export default App;
