import React, {useContext, useState} from 'react';
import LoginForm from "../forms/LoginForm.jsx";
import {observer} from "mobx-react-lite";
import EntryParticipant from "./EntryParticipant.jsx";
import EntryOrganizer from "./EntryOrganizer.jsx";
import EntryModerator from "./EntryModerator.jsx";
import classes from './loginCom.module.css'



const LoginComponent = observer(({isRegister}) => {
    const [whoIsEntry, setWhoIsEntry] = useState('participant');

    return (
        <div className={classes.loginComponent}>
            {whoIsEntry === 'participant' && <EntryParticipant setRoleToEntry={setWhoIsEntry} isRegistration={isRegister}/>}
            {whoIsEntry === 'organizer' && <EntryOrganizer setRoleToEntry={setWhoIsEntry} isRegistration={isRegister}/>}
            {whoIsEntry === 'moderator' && <EntryModerator setRoleToEntry={setWhoIsEntry} isRegistration={isRegister}/>}
        </div>
    );
});

export default LoginComponent;