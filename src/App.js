import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import Assessments from "./pages/Assessments";
import Staff from "./pages/Staff";
import Main from "./pages/Main";
import { IRootState, useAppDispatch } from "./store";
import { getProfile } from "./store/auth/actionCreators";

function App() {
  const isLoggedIn = useSelector(
    (state: IRootState) => !!state.auth.authData.accessToken
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Main />}/>
        <Route
          path="/assessments"
          element={isLoggedIn ? <Assessments /> : <Navigate to="/" />}
        />
        <Route
          path="/staff"
          element={isLoggedIn ? <Staff /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}
export default App;
