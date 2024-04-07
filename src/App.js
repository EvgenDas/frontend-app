import React from 'react';
import Main from "./pages/Main"
import { useSelector } from "react-redux";
import Dashboard from "./pages/Dashboard"
import Header from './components/Header';
import { IRootState} from "./store";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  const isLoggedIn = useSelector(
    (state: IRootState) => !!state.auth.authData.accessToken
  );

  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<Main />}/>
        <Route
          path="/dashboard"
          element={isLoggedIn ? <Dashboard /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}
export default App;
