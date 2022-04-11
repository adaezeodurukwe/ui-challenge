import React from 'react'
import { useEffect } from 'react';
import '../App.css';
import Body from '../components/Body';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Slider from '../components/Slider';
import { useStoreContextProvider } from '../contexts/StoreContext';

const Home = () => {
  const { getData, open, setOpen, searchTerm } = useStoreContextProvider();

  useEffect(() => {
    getData()
  }, [])


  const getPercents = (index) => {

  }

  return (
    <div className="App">
      <Sidebar
        open={open}
        setOpen={setOpen}
      />

      <Header />

      {!searchTerm && <Slider />}

      <Body />
    </div>
  );
}

export default Home