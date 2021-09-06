import React from "react";
import { BookToRead } from "./index";

type BookRowProps = {
  book: BookToRead;
  onMemoChange: (id: number, memo: string) => void;
  onDelete: (id: number) => void;
};

const BookRow = (props: BookRowProps): JSX.Element => {
  const { id, title, authors, memo } = props.book;

  const handleMemoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onMemoChange(id, e.target.value);
  };

  const handleDelete = () => {
    props.onDelete(id);
  };

  return (
    <div className="book-row">
      <div title={title} className="title">
        {title}
      </div>
      <div title={authors} className="authors">
        {authors}
      </div>
      <input
        type="text"
        className="memo"
        value={memo}
        onChange={handleMemoChange}
      />
      <button className="delete-row" type="button" onClick={handleDelete}>
        削除
      </button>
    </div>
  );
};

export default BookRow;
