/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useEffect, useRef, useState } from "react";
import { BookDescription, BookSearchItem } from "./index";

function buildSearchUrl(
  title: string,
  author: string,
  maxResults: number
): string {
  const url = "https://www.googleapis.com/books/v1/volumes?q=";
  const conditions: string[] = [];
  if (title) {
    conditions.push(`intitle:${title}`);
  }
  if (author) {
    conditions.push(`inauthor:${author}`);
  }
  return `${url + conditions.join("+")}&maxResults=${maxResults}`;
}

function extractBooks(json: any): BookDescription[] {
  const { items } = json;
  return items.map((item: any) => {
    const { volumeInfo } = item;
    return {
      title: volumeInfo.title,
      authors: volumeInfo.authors ? volumeInfo.authors.join(", ") : "",
      thumbnail: volumeInfo.imageLinks
        ? volumeInfo.imageLinks.smallThumbnail
        : "",
    };
  });
}

type BookSearchDialogProps = {
  maxResults: number;
  onBookAdd: (book: BookDescription) => void;
};

const BookSearchDialog = (props: BookSearchDialogProps): JSX.Element => {
  const [books, setBooks] = useState([] as BookDescription[]);
  const [isSearching, setIsSearching] = useState(false);
  const titleRef = useRef<HTMLInputElement>(null);
  const authorRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearching) {
      const url = buildSearchUrl(
        titleRef.current!.value,
        authorRef.current!.value,
        props.maxResults
      );
      fetch(url)
        .then((res) => res.json())
        .then((json) => extractBooks(json))
        .then((booksResult) => {
          setBooks(booksResult);
        })
        .catch((error) => {
          console.error(error);
        });
    }
    setIsSearching(false);
  }, [isSearching, props.maxResults]);

  const handleSearchClick = () => {
    if (!titleRef.current!.value && !authorRef.current!.value) {
      // eslint-disable-next-line no-alert
      alert("条件を記入してください");
      return;
    }
    setIsSearching(true);
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
