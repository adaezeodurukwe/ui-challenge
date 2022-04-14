import React, { useState } from "react";
import { useStoreContextProvider } from "../contexts/StoreContext";
import SvgComponent from "./SvgComponent";
import { useNavigate } from "react-router-dom";
import Logo from "../assets/logo.svg";

const Header = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const { searchTerm, setSearchTerm, cart, setOpen, isSearchPage } =
    useStoreContextProvider();

  const search = (e) => {
    e.preventDefault();
    if (isSearchPage) {
      setSearchTerm("");
    } else {
      navigate("/search");
    }
  };

  return (
    <header className="">
      <div className="inner py-4 flex justify-between relative">
        <div
          onClick={() => navigate("/")}
          className="flex items-center cursor-pointer"
        >
          <img width="40" src={Logo} alt="logo" />
          <span className="flex flex-col ml-4">
            <strong>Quidax Books</strong>
            <i className="text-xs text-gray">A flimsy book company</i>
          </span>
        </div>

        <div className={`form-container ${show ? "show" : "hidden"}`}>
          <div className="w-full flex items-center justify-center">
            <button className="mr-4 remove" onClick={() => setShow(false)}>
              <SvgComponent name="back-big" width="24" height="25" />
            </button>

            <form onSubmit={search} className="search flex items-center">
              <input
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
                placeholder="Search books, genres, authors, etc..."
              />
              <button>
                <SvgComponent
                  name={isSearchPage && searchTerm ? "close" : "search"}
                  width="24"
                  height="24"
                />
              </button>
            </form>
          </div>
        </div>

        <button className="search-icon remove" onClick={() => setShow(true)}>
          <SvgComponent name="search" width="24" height="24" />
        </button>

        <div className="flex items-center">
          <button
            className={isSearchPage ? "fill-search" : "fill-home"}
            onClick={() => {
              setSearchTerm("");
              navigate("/");
            }}
          >
            <SvgComponent name="logo-light" width="50" height="50" />
          </button>

          <button className="ml-4 relative" onClick={() => setOpen(true)}>
            <span className="indicator absolute flex items-center justify-center">
              {cart.length}
            </span>
            <SvgComponent classes="mr-2" name="cart" width="18" height="18" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
