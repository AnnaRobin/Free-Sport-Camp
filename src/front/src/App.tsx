// import ErrorBoundary from './components/ErrorBoundary';
//const GettingStarted = React.lazy(() => import('./pages/GettingStarted'));
//const NotFound = lazy(() => import('./pages/NotFound'));
// const Unauthorized = lazy(() => import('./pages/Unauthorized'));

import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from './components/Header';
import MiniFooter from './components/MiniFooter';

import AppLayout from './components/AppLayout';
 
import './App.css';

import Search from './pages/Search';
import Inscription from './pages/Inscription';
import Connection from './pages/Connection';
import Mission from './pages/Mission';
import Activities from './pages/Activities';
import Publications from './pages/Publications'
import Create from './pages/Event';
import Edit from './pages/Event/Edit';
import {Password} from './pages/Account/Password';
import {View}  from './pages/Profile/View';
import {Edit as ProfileEdit}  from './pages/Profile/Edit';
import {Public}  from './pages/Profile/Public';


// collects the pages (header / content / footer) and takes care of the routing between them
const App: React.FunctionComponent<{}> = () => {
  return (
    <BrowserRouter>
      <AppLayout
        header={<Header />}
        content={       
          <Switch>
          <Route exact={true} path="/search" component={Search} />
          <Route exact={true} path="/inscription" component={Inscription} />
          <Route exact={true} path="/password" component={Password} />
          <Route exact={true} path="/activities" component={Activities} />
          <Route exact={true} path="/publications" component={Publications} />
          <Route exact={true} path="/connection" component={Connection} />
          <Route exact={true} path="/event/create" component={Create} />
          <Route exact={true} path="/event/edit/:eventId" component={Edit} />
          <Route exact={true} path="/" component={Mission} />
          <Route exact={true} path="/profile" component={View} />
          <Route exact={true} path="/profile/edit" component={ProfileEdit} />
          <Route exact={true} path="/profile/:userId" component={Public} />
          </Switch>
        }   
        footer={<MiniFooter />}
      />  
      </BrowserRouter> 
  );
};
export default App;













