import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IRootState } from "../../store";

const Header = () => {
  const isLoggedIn = useSelector(
    (state: IRootState) => !!state.auth.authData.accessToken
  );

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Main</Link>
        </li>
        {isLoggedIn && (
          <li>
            <Link to="/assessments">Assessments</Link>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <Link to="/staff/manager">Manager Staff</Link>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <Link to="/staff/expert">Expert Staff</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Header;