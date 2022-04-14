import React, { useEffect } from "react";
import Body from "../components/Body";
import Header from "../components/Header";
import { useStoreContextProvider } from "../contexts/StoreContext";

const Search = () => {
  const { searchForBook, searchTerm } = useStoreContextProvider();

  useEffect(() => {
    searchForBook();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  return (
    <>
      <Header />
      <Body />
    </>
  );
};

export default Search;
