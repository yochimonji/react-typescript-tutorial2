import React, { useState } from "react";
import { BookDescription, BookSearchItem } from "./index";

type BookSearchDialogProps = {
  // maxResults: number;
  onBookAdd: (book: BookDescription) => void;
};

const BookSearchDialog = (props: BookSearchDialogProps): JSX.Element => {
  const [books, setBooks] = useState([] as BookDescription[]);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const handleTitleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleAuthorInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthor(e.target.value);
  };

  const handleSearchClick = () => {
    if (!title && !author) {
      // eslint-disable-next-line no-alert
      alert("条件を記入してください");
    }
  };

  const handleBookAdd = (book: BookDescription) => {
    props.onBookAdd(book);
  };

  const bookItems = books.map((b, idx) => (
    <BookSearchItem
      description={b}
      onBookAdd={handleBookAdd}
      key={idx.toString()}
    />
  ));

  return (
    <div className="dialog">
      <div className="operation">
        <div className="conditions">
          <input
            type="text"
            onChange={handleTitleInputChange}
            placeholder="タイトルで検索"
          />
          <input
            type="text"
            onChange={handleAuthorInputChange}
            placeholder="著者名で検索"
          />
        </div>
        <button
          type="button"
          className="button-like"
          onClick={handleSearchClick}
        >
          検索
        </button>
      </div>
      <div className="search-results">{bookItems}</div>
    </div>
  );
};

export default BookSearchDialog;
