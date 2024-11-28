import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Login from "./components/Login";
import Home from "./components/Home";
import { PrivateRoute, AuthRoute } from "./utils/PrivateRoute";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<AuthRoute />}>
            <Route path="/login" element={<Login />} />
          </Route>

          <Route path="/dashboard" element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Home />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
