import React from 'react';
import logo from './logo.svg';
import './App.css';

import Header from './components/Header';
import MiniFooter from './components/MiniFooter';
import SearchBar from './components/SearchBar';


function App() {
  return (
    <>
    <Header/>
    <SearchBar/>

<p>Votre allié</p><p>pour trouver vos partenaires de sport</p>
    
    <MiniFooter/>
    
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
