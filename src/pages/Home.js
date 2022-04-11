import React from "react";
import { useEffect } from "react";
import "../App.css";
import Body from "../components/Body";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Slider from "../components/Slider";
import { useStoreContextProvider } from "../contexts/StoreContext";

const Home = () => {
  const { getData, open, setOpen, searchTerm, allBooks } =
    useStoreContextProvider();

  useEffect(() => {
    getData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <div className="App">
      <Sidebar open={open} setOpen={setOpen} />

      <Header />

      {!searchTerm && <Slider books={allBooks} />}

      <Body />
    </div>
  );
};

export default Home;
