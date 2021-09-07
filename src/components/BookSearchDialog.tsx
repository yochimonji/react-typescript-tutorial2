/* eslint-disable no-alert */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useState, useRef } from "react";
import { BookDescription, BookSearchItem, useBookData } from "./index";

type BookSearchDialogProps = {
  maxResults: number;
  onBookAdd: (book: BookDescription) => void;
};

const BookSearchDialog = (props: BookSearchDialogProps): JSX.Element => {
  const titleRef = useRef<HTMLInputElement>(null);
  const authorRef = useRef<HTMLInputElement>(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const books = useBookData(title, author, props.maxResults);

  const handleSearchClick = () => {
    if (!titleRef.current!.value && !authorRef.current!.value) {
      alert("条件を入力してください");
      return;
    }
    setTitle(titleRef.current!.value);
    setAuthor(authorRef.current!.value);
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
          <input type="text" ref={titleRef} placeholder="タイトルで検索" />
          <input type="text" ref={authorRef} placeholder="著者名で検索" />
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
