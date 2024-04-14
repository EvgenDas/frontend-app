import React from "react";
import { useSelector } from "react-redux";
import { IRootState , useAppDispatch } from "../../store";
import { getProfile, getAssessments } from "../../store/auth/actionCreators";
import Login from "../Main/components/Login/Login";

const Assessments = () => {
    const dispatch = useAppDispatch();

    const isLoggedIn = useSelector(
        (state: IRootState) => !!state.auth.authData.accessToken
      );
      
    const ownAssessment = useSelector(
        (state: IRootState) => state.auth.profileData.ownAssessment
    );
    const expertAssessment = useSelector(
        (state: IRootState) => state.auth.profileData.expertAssessment
    );
    const managerAssessment = useSelector(
        (state: IRootState) => state.auth.profileData.managerAssessment
    );

    const finalAssessment = useSelector(
        (state: IRootState) => state.auth.profileData.finalAssessment
    );

    const dateOfAssessment = useSelector(
        (state: IRootState) => state.auth.profileData.dateOfAssessment
    );

    const active = useSelector(
        (state: IRootState) => state.auth.profileData.active
    );

      const renderProfile = () => (
        <div>
        <div>
            <p>Own assessment: {ownAssessment}</p>
            <p>Expert assessment: {expertAssessment}</p>
            <p>Manager assessment: {managerAssessment}</p>
            <p>Final assessment: {finalAssessment}</p>
            <p>Date of assessment: {dateOfAssessment}</p>
            <p>Active: {active}</p>
            
        </div>
    </div>  
      );
    
      return (
        <div>
          <h1>Assessment</h1>
          {/* {dispatch(getAssessments())} */}
          {isLoggedIn ? renderProfile() : <Login />}
        </div>
      );
};

export default Assessments;