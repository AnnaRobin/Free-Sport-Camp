import React, { Suspense, lazy } from 'react';
import { Route, Switch } from 'react-router-dom';


import Header from './components/Header';
import MiniFooter from './components/MiniFooter';
import SearchBar from './components/SearchBar';

// import ErrorBoundary from './components/ErrorBoundary';
import AppLayout from './components/AppLayout';
 
import './App.css';
// import Search from './pages/Mission';
// import Search from './pages/Search';
// import Search from './pages/Creation';

//const GettingStarted = React.lazy(() => import('./pages/GettingStarted'));
//const NotFound = lazy(() => import('./pages/NotFound'));
//const Unauthorized = lazy(() => import('./pages/Unauthorized'));

const App: React.FunctionComponent<{}> = () => {
  return (
      <AppLayout
        header={<Header />}
        content={<SearchBar/>}
     
    
        footer={<MiniFooter />}
      />
    
  );
};

export default App;













