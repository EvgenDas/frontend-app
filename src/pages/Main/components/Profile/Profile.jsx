import React, { FormEvent, useState } from "react";
import { useAppDispatch } from "../../../../store";
import { getProfile } from "../../../../store/auth/actionCreators";
import { useSelector } from "react-redux";


const Profile = () => {

    const name = useSelector(
        (state: IRootState) => state.auth.profileData.name
    );
    const surname = useSelector(
        (state: IRootState) => state.auth.profileData.surname
    );
    const managerId = useSelector(
        (state: IRootState) => state.auth.profileData.managerId
    );

    const expertId = useSelector(
        (state: IRootState) => state.auth.profileData.expertId
    );

    const dateOfNextAssessment = useSelector(
        (state: IRootState) => state.auth.profileData.dateOfNextAssessment
    );

    const login = useSelector(
        (state: IRootState) => state.auth.profileData.login
    );
       


    return (
    <div>
        <div>
            <p>Name: {name}</p>
            <p>Surname: {surname}</p>
            <p>Manager id: {managerId}</p>
            <p>Expert id: {expertId}</p>
            <p>Next Assessment: {dateOfNextAssessment}</p>
            <p>Login: {login}</p>
            
        </div>
    </div>  
    );
};

export default Profile;