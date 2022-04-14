import React from "react";
import "../App.css";
import Body from "../components/Body";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Slider from "../components/Slider";
import { useStoreContextProvider } from "../contexts/StoreContext";

const Home = () => {
  const { open, setOpen, featuredBooks } = useStoreContextProvider();

  return (
    <div className="App">
      <Sidebar open={open} setOpen={setOpen} />
      <Header />
      <Slider books={featuredBooks} />
      <Body />
    </div>
  );
};

export default Home;
