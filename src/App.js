import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import Main from "./pages/Main";
import Assessments from "./pages/Main/components/Assessments/Assessments";
import { IRootState, useAppDispatch } from "./store";
import { getProfile } from "./store/auth/actionCreators";
import ManagerStaff from "./pages/Main/components/ManagerStaff/ManagerStaff";
import ExpertStaff from "./pages/Main/components/ExpertStaff/ExpertStaff";

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
          path="/staff/manager"
          element={isLoggedIn ? <ManagerStaff /> : <Navigate to="/" />}
        />
        <Route
          path="/staff/expert"
          element={isLoggedIn ? <ExpertStaff /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}
export default App;
