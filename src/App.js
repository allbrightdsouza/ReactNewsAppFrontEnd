import React from 'react';
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect
} from 'react-router-dom';

import './App.css';
import CustomNavBar from './components/CustomNavBar';
import HomePage from './pages/HomePage';
import PageNotFound from './pages/PageNotFound';
import BookmarksPage from './pages/BookmarksPage';
import ArticlePage from './pages/ArticlePage';
import SearchPage from './pages/SearchPage';

function App() {

  return (
    <Router>
      <div className="App">
        <CustomNavBar />
        <div id="page-body">
          <Switch>
            <Route path="/top/:source/:domain" component={HomePage} exact />
            <Route path="/bookmarks" component={BookmarksPage} exact />
            <Route path="/search/:keyword" component={SearchPage} exact />
            <Route path="/article/:id" component={ArticlePage} exact />
            <Redirect from="/" to="/top/nytimes/all" exact/>
            <Route component={PageNotFound} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
