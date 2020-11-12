import React from 'react';
//import { Route, Switch } from 'react-router-dom';
import logo from './logo.svg';


import Header from './components/Header';
import MiniFooter from './components/MiniFooter';
import SearchBar from './components/SearchBar';
 
import './App.css';


function App() {
  return (
    <>
    <Header/>
    <SearchBar/>

<p className="text-xl-center font-weight-bolder">Votre allié <br/> pour trouver vos partenaires de sport</p>
    
    
    <MiniFooter />
    
    </>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.tsx</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
