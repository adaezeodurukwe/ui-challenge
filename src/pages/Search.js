import React, { useEffect } from "react";
import Body from "../components/Body";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useStoreContextProvider } from "../contexts/StoreContext";

const Search = () => {
  const { searchForBook, searchTerm, open, setOpen } = useStoreContextProvider();

  useEffect(() => {
    searchForBook();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  return (
    <>
      <Sidebar open={open} setOpen={setOpen} />
      <Header />
      <Body />
    </>
  );
};

export default Search;
