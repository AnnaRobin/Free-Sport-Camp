import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';


import Header from './components/Header';
import MiniFooter from './components/MiniFooter';

// import ErrorBoundary from './components/ErrorBoundary';
import AppLayout from './components/AppLayout';
import SearchBar from './components/SearchBar'
 
import './App.css';
// import Search from './pages/Mission';
import Search from './pages/Search';

// import Search from './pages/Creation';

//const GettingStarted = React.lazy(() => import('./pages/GettingStarted'));
//const NotFound = lazy(() => import('./pages/NotFound'));
//const Unauthorized = lazy(() => import('./pages/Unauthorized'));

const App: React.FunctionComponent<{}> = () => {
  return (
      <AppLayout
        header={<Header />}


        content={
        <BrowserRouter>
          <Switch>
          <Route exact={true} path="/search" component={Search} />
          </Switch>
          </BrowserRouter>
        }
     
    
        footer={<MiniFooter />}
      />
    
  );
};

export default App;













