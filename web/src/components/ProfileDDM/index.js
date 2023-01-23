import React from "react";
import { ProfileDDMContainer, ProfilePicture, ProfileName, ProfileEmail, Separator, LogOut } from "./ProfileDDMElements";

const ProfileDDM = ( {profileOpen, toggleProfile, x, y, userData} ) => {
    if (!profileOpen) return null;
    return (
        <ProfileDDMContainer x={x} y={y}>
            <ProfilePicture x={x} y={y} on onClick={toggleProfile}>{userData.initials}</ProfilePicture>
            <ProfileName x={x} y={y}>{userData.username}</ProfileName>
            <ProfileEmail x={x} y={y}>{userData.email}</ProfileEmail>
            <Separator />
        </ProfileDDMContainer>
    );
};

export default ProfileDDM;
