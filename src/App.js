import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import Galleries from "./pages/Galleries";
import { logout } from "./store/auth/slice";
import {
  selectActiveUser,
  selectIsAuthenticated,
} from "./store/auth/selectors";
import { useSelector, useDispatch } from "react-redux";
import CreateGallery from "./pages/CreateGallery";
import Gallery from "./pages/Gallery";

function App() {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const dispatch = useDispatch();
  const activeUser = useSelector(selectActiveUser);

  function handleLogout() {
    dispatch(logout());
  }
  return (
    <div className="App">
      <Router>
        <nav>
          <ul>
            <li>
              <Link to="/">All Galleries</Link>
            </li>
            {!isAuthenticated && (
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}
            {!isAuthenticated && (
              <li>
                <Link to="/register">Register</Link>
              </li>
            )}
            {isAuthenticated && (
              <li>
                <Link to="/galleries/my-galleries">My Galleries</Link>
              </li>
            )}
            {isAuthenticated && (
              <li>
                <Link to="/create">Create Gallery</Link>
              </li>
            )}
            {isAuthenticated && (
              <li>
                <span onClick={handleLogout}>Logout</span>
              </li>
            )}
          </ul>
        </nav>
        <Switch>
          <PublicRoute exact path="/register">
            <Register />
          </PublicRoute>
          <PublicRoute exact path="/login">
            <Login />
          </PublicRoute>
          <Route exact path="/">
            <Redirect to="/galleries" />
          </Route>
          <Route exact path="/galleries">
            <Galleries />
          </Route>
          <PrivateRoute exact path="/galleries/my-galleries">
            <Galleries selfId={isAuthenticated ? activeUser?.id : null} />
          </PrivateRoute>
          <PrivateRoute exact path="/create">
            <CreateGallery />
          </PrivateRoute>
          <Route exact path="/galleries/:id">
            <Gallery />
          </Route>
          <Route exact path="/authors/:id">
            <Galleries />
          </Route>
          <PrivateRoute exact path="/edit-gallery/:id">
            <CreateGallery />
          </PrivateRoute>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
