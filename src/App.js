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

function App() {
  return (
    <div className="App">
      <Router>
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
        </Switch>
      </Router>
    </div>
  );
}

export default App;
