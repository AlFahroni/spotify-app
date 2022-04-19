import './App.css';
import CreatePlaylist from './pages/CreatePlayList';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Auth from './pages/Auth';
import GuardRoute from './components/RouteGuard';
import NotFound from './pages/PagesNotFound';

function App() {
  return (
    <div className="App">
      <Router>
          <Switch>
            <GuardRoute path="/create-playlist" type="private" exact>
              <CreatePlaylist />
            </GuardRoute>
            <GuardRoute path="/" type="guest" exact>
              <Auth />
            </GuardRoute>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </Router>
    </div>
  );
}

export default App;