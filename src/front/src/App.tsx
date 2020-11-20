import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';


import Header from './components/Header';
import MiniFooter from './components/MiniFooter';
import ScrollToTop from './components/ScrollToTop';


// import ErrorBoundary from './components/ErrorBoundary';
import AppLayout from './components/AppLayout';
import SearchBar from './components/SearchBar'
 
import './App.css';
// import Search from './pages/Mission';
import Search from './pages/Search';
import Inscription from './pages/Inscription';
import Connection from './pages/Connexion';
import Mission from './pages/Mission';

import Creation from './pages/Creation';

//const GettingStarted = React.lazy(() => import('./pages/GettingStarted'));
//const NotFound = lazy(() => import('./pages/NotFound'));
//const Unauthorized = lazy(() => import('./pages/Unauthorized'));

const App: React.FunctionComponent<{}> = () => {
  return (
      <AppLayout
        header={<Header />}


        content={
         
        <BrowserRouter>
         <ScrollToTop>
          <Switch>
          <Route exact={true} path="/search" component={Search} />
          <Route exact={true} path="/inscription" component={Inscription} />
          <Route exact={true} path="/connexion" component={Connection} />
          <Route exact={true} path="/ad" component={Creation} />
          <Route exact={true} path="/mission" component={Mission} />
          </Switch>
          </ScrollToTop>
          </BrowserRouter>
          
        }
     
    
        footer={<MiniFooter />}
      />
    
  );
};

export default App;













