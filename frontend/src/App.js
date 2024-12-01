import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./components/Login";
import Home from "./components/Home";
import { PrivateRoute, AuthRoute } from "./utils/PrivateRoute";
import Register from "./components/Register";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/" element={<AuthRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Register />} />
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
