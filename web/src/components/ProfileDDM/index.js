import React from "react";
import { ProfileDDMContainer, ProfilePicture, ProfileName, ProfileEmail, Separator, Button } from "./ProfileDDMElements";

const ProfileDDM = ( {profileOpen, toggleProfile, x, y} ) => {

    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [initials, setInitials] = React.useState('');

    React.useEffect(() => {
        if (username === '') {
            setUsername(sessionStorage.username)
        }

        if (email === '') {
            setEmail(sessionStorage.email)
        }

        if (initials === '') {
            setInitials(sessionStorage.initials)
        }
    }, [username, email, initials]);

    if (!profileOpen) return null;
    return (
        <ProfileDDMContainer x={x} y={y}>
            <ProfilePicture x={x} y={y} on onClick={toggleProfile}>{initials}</ProfilePicture>
            <ProfileName x={x} y={y}>{username}</ProfileName>
            <ProfileEmail x={x} y={y}>{email}</ProfileEmail>
            <Separator />
            <Button>Log Out</Button>
        </ProfileDDMContainer>
    );
};

export default ProfileDDM;
