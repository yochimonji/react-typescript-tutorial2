/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useState, useEffect } from "react";
import { BookDescription } from "./index";

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

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useBookData = (title: string, author: string, maxResults: number) => {
  const [books, setBooks] = useState([] as BookDescription[]);

  useEffect(() => {
    if (title || author) {
      const url = buildSearchUrl(title, author, maxResults);
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
  }, [author, maxResults, title]);

  return books;
};

export default useBookData;
