import React, {useState} from 'react';

import RegistrationParticipant from "./RegistrationParticipant.jsx";
import RegistrationOrganizer from "./RegistrationOrganizer.jsx";
import classes from '../login/loginCom.module.css'

const RegistrationComponent = ({isRegister}) => {
    const [whoIsEntry, setWhoIsEntry] = useState('participant');
    return (
        <div  className={classes.loginComponent}>
            {whoIsEntry === 'participant' &&
                <RegistrationParticipant setRoleToEntry={setWhoIsEntry} isLogin={isRegister}/>}
            {whoIsEntry === 'organizer' && <RegistrationOrganizer setRoleToEntry={setWhoIsEntry} isLogin={isRegister}/>}
        </div>
    );
};

export default RegistrationComponent;