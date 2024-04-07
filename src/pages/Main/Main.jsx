import React from "react";
import Login from "./components/Login";
import { IRootState , useAppDispatch } from "../../store";
import { logoutUser } from "../../store/auth/actionCreators";
import { useSelector } from "react-redux";

const Main = () => {
    const dispatch = useAppDispatch();
    const isLoggedIn = useSelector(
        (state: IRootState) => !!state.auth.authData.accessToken
    );

    const renderProfile = () => (
        <div>
            <div>Вы успешно авторизовались</div>
            <button onClick={() => dispatch(logoutUser())}>Logout</button>
        </div>
    )
    return (
        <div>
            <h1>Main</h1> 
          {isLoggedIn ? renderProfile() : <Login/>}
        </div>
    );
};

export default Main;