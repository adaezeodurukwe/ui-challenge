import { useEffect, useState } from 'react';
import './App.css';
import RatingComponent from './components/RatingComponent';
import Sidebar from './components/Sidebar';
import Slider from './components/Slider';
import SvgComponent from './components/SvgComponent';

function App() {
  const [books, setbooks] = useState([])
  const [open, setOpen] = useState(false)

  useEffect(() => {
    getData()
  }, [])
  const getData = () => {
    fetch('data.json'
      , {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    )
      .then((response) => response.json())
      .then((json) => {
        setbooks(json.data)
      });
  }

  const getPercents = (index) => {

  }

  return (
    <div className="App">
      {open && <Sidebar 
        increaseItemQuantity={() => {}}
        decreaseItemQuantity={() => {}}
        removeItem={() => {}}
        cartItems={() => {}}
        setOpen={() => {}}
        products={[]}
      />}
      <header className="">
        <div className="inner py-4 flex justify-between">
          <div className="flex items-center">
            <SvgComponent name="logo" width="50" height="50" />
            <span className="flex flex-col ml-4">
              <strong>Quidax Books</strong>
              <i className="text-xs text-gray">A flimsy book company</i>
            </span>
          </div>
          <form className="search flex items-center">
            <input placeholder="Search books, genres, authors, etc." />
            <button>
              <SvgComponent name="search" width="24" height="24" />
            </button>
          </form>
          <div className="flex items-center">
            <SvgComponent name="logo-light" width="50" height="50" />
            <button className="ml-4" onClick={() => setOpen(!open)}>
              <SvgComponent classes="mr-2" name="cart" width="18" height="18" />
            </button>
          </div>
        </div>
      </header>

        <h4>Featured books</h4>

        <Slider />

        <h4>All books</h4>

      <main>
        
        {books.map(book => (
          <div key={book.id} className="flex box">
            <img
              src={book.image_url}
              alt={book.title}
              width="110"
              height="183"
            />
            <div className="flex flex-col text-xs ml-4">
              <strong className="text-sm my-2">{book.title}</strong>
              <span>{book.authors[0].name} - {new Date(book.published_at).getFullYear()}</span>
              <span>{book.genre}</span>
              <span className="flex my-2">
                <span className="flex">
                  <span className="flex flex-col justify-center items-center">
                    <SvgComponent name="people" width="24" height="24" />
                    {book.number_of_purchases}
                  </span>
                  <span className="flex flex-col justify-center items-center">
                    <SvgComponent name="like" width="24" height="24" />
                    {book.likes}
                  </span>
                </span>

                <span className="vertical-line mr-4 ml-4"></span>

                <span className="flex flex-col justify-center ">
                  <span>Rating: {book.rating}</span>
                  <span>
                    <span>
                      {
                        Array(5).fill().map((value, index) => {
                          // 4.5 - 1 
                          const whole = parseInt(book.rating)
                          const remainder = parseInt(book.rating.toString().split(".")[0])

                          return (
                            <RatingComponent
                              fillpercent={(index + 1) < whole ? "100%" : `${remainder * 10}%`}
                              remainpercent={whole - (index + 1) ? "0%" : `${100 - (remainder * 10)}%`}
                              key={index}
                            />
                          )
                        })
                      }
                    </span>
                  </span>
                </span>
              </span>
              <span className="flex my-2">
                <span>$ {book.price}</span>
                <span className="ml-4 text-green">{book.available_copies} copies available</span>
              </span>
              <button className="flex items-center mt-2 cursor-pointer">
                <SvgComponent classes="mr-2" name="cart" width="18" height="18" />
                <strong>Add to cart</strong>
              </button>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}

export default App;
