import React from "react";
import { useSelector } from "react-redux";
import { IRootState , useAppDispatch } from "../../store";
import { getProfile, logoutUser } from "../../store/auth/actionCreators";
import Profile from "./components/Profile"
import Login from "./components/Login";


const Main = () => {
    const dispatch = useAppDispatch();
    const profile = useSelector(
        (state: IRootState) => state.auth.profileData.name
      );

    const isLoggedIn = useSelector(
        (state: IRootState) => !!state.auth.authData.accessToken
      );

    
    const renderProfile = () => (
        <div>
          <div>Вы успешно авторизовались, {profile}</div>
          <button onClick={() => dispatch(logoutUser())}>Logout</button>
          <div>
            <p></p>
          {<Profile />}
          </div>
        </div>
      );
    
      return (
        <div>
          <h1>Main</h1>
          {isLoggedIn ? renderProfile() : <Login />}
        </div>
      );
};

export default Main;