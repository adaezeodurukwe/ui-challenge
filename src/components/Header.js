import React from 'react'
import { useStoreContextProvider } from '../contexts/StoreContext';
import SvgComponent from './SvgComponent'

const Header = () => {
  const { searchTerm, setSearchTerm, cart, setOpen } = useStoreContextProvider();

  return (
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
            <input onChange={(e) => setSearchTerm(e.target.value)} value={searchTerm} placeholder="Search books, genres, authors, etc." />
            <button>
              <SvgComponent name="search" width="24" height="24" />
            </button>
          </form>
          <div className="flex items-center">
            <SvgComponent name="logo-light" width="50" height="50" />
            <button className="ml-4 relative" onClick={() => setOpen(true)}>
              <span className="indicator absolute flex items-center justify-center">
                {cart.length}
              </span>
              <SvgComponent classes="mr-2" name="cart" width="18" height="18" />
            </button>
          </div>
        </div>
      </header>

  )
}

export default Header