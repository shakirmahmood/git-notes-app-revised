import { ThemeProvider } from '@material-ui/core/styles';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header/Header';
import { NoResultsFound } from './components/NoResultsFound/NoResultsFound';
import { PageNotFound } from './components/NoResultsFound/PageNotFound';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import CreateGist from './pages/CreateGist/CreateGist.jsx';
import GistDetail from './pages/GistDetail/GistDetail.jsx';
import Home from './pages/Home/Home.jsx';
import Profile from './pages/Profile/Profile.jsx';
import customTheme from './themeCreatore';

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <Router>
        <div className="App">
          <Header />
          <Switch>
            <Route path="/gists/:page" exact component={Home} />
            <Route path="/no-results" exact component={NoResultsFound} />
            <Route path="/gist-details/:id" component={GistDetail} />
            <PrivateRoute path={['/create-gist', '/update-gist/:id']} component={CreateGist} />
            <Route
              exact
              path={['/profile/:username/:page', '/profile/:username/:type/:page']}
              component={Profile}
            />
            <Route component={PageNotFound} />
          </Switch>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
