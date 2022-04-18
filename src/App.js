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
import { useState } from "react";
import AuthService from "./services/AuthService";
import Galleries from "./pages/Galleries";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  async function handleLogout() {
    await AuthService.logout();
    setIsAuthenticated(false);
  }
  return (
    <div>
      <Router>
        <nav>
          <li>
            <Link to="/">Galleries</Link>
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
              <span onClick={handleLogout}>Logout</span>
            </li>
          )}
        </nav>
        <Switch>
          <Route exact path="/">
            <Galleries />
          </Route>
          <PublicRoute exact path="/login">
            <Login
              onLogin={() => {
                setIsAuthenticated(true);
              }}
            />
          </PublicRoute>
          <PublicRoute exact path="/register">
            <Register
              onRegister={() => {
                setIsAuthenticated(true);
              }}
            />
          </PublicRoute>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
