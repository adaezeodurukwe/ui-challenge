import React from "react";
import { useStoreContextProvider } from "../contexts/StoreContext";
import RatingComponent from "./RatingComponent";
import SvgComponent from "./SvgComponent";

const Body = () => {
  const { books, searchTerm, addItem, isSearchPage } =
    useStoreContextProvider();

  return (
    <main>
      {searchTerm && isSearchPage ? (
        <h4>
          {books.length} <span className="thin">results found for</span>{" "}
          {searchTerm}
        </h4>
      ) : (
        <h4>All books</h4>
      )}

      <div className="inner">
        {books.length ? (
          books.map((book) => (
            <div key={book.id} className="flex box">
              <img
                src={book.image_url}
                alt={book.title}
                width="110"
                height="183"
              />
              <div className="flex flex-col text-xs ml-4">
                <strong className="text-sm my-2">{book.title}</strong>
                <span>
                  {book.authors[0].name} -{" "}
                  {new Date(book.published_at).getFullYear()}
                </span>
                <span>{book.genre}</span>
                <span className="flex my-2">
                  <span className="flex">
                    <span className="flex flex-col justify-center items-center">
                      <SvgComponent name="people" width="24" height="24" />
                      {book.number_of_purchases}
                    </span>
                    <span className="flex flex-col justify-center items-center text-black">
                      <SvgComponent name="like" width="24" height="24" />
                      {book.likes}
                    </span>
                  </span>

                  <span className="vertical-line mr-4 ml-4"></span>

                  <span className="flex flex-col justify-center ">
                    <span>Rating: {book.rating}</span>
                    <RatingComponent book={book} />
                  </span>
                </span>
                <span className="flex my-2">
                  <span>$ {book.price}</span>
                  <span
                    className={`ml-4 ${
                      !book.available_copies ? "text-red" : "text-green"
                    }`}
                  >
                    {!book.available_copies
                      ? "Out of stock"
                      : `${
                          book.quantity
                            ? book.available_copies - book.quantity
                            : book.available_copies
                        }
                         copies available`}
                  </span>
                </span>
                <button
                  onClick={() => addItem(book)}
                  className="flex items-center mt-2 cursor-pointer"
                >
                  <SvgComponent
                    classes="mr-2"
                    name="cart"
                    width="18"
                    height="18"
                  />
                  <strong>Add to cart</strong>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div>No book to show</div>
        )}
      </div>
    </main>
  );
};

export default Body;
