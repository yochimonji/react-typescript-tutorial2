import { BookDescription } from "./index";

type BookSearchItemProps = {
  description: BookDescription;
  onBookAdd: (book: BookDescription) => void;
};

const BookSearchItem = (props: BookSearchItemProps): JSX.Element => {
  const { title, authors, thumbnail } = props.description;
  const handleAddBookClick = () => {
    props.onBookAdd(props.description);
  };

  return (
    <div className="book-search-item">
      <h2 title={title}>{title}</h2>
      <div className="authors" title={authors}>
        {authors}
      </div>
      {thumbnail && <img src={thumbnail} alt="" />}
      <button type="button" className="add-book" onClick={handleAddBookClick}>
        <span>+</span>
      </button>
    </div>
  );
};

export default BookSearchItem;
