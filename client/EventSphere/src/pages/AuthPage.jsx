import React, {useState} from 'react';
import LoginComponent from "../shared/components/auth/login/loginComponent.jsx";
import RegistrationComponent from "../shared/components/auth/registration/RegistrationComponent.jsx";
import classes from '../styles/authPage.module.css'

const AuthPage = () => {
    const [isRegister, setIsRegister] = useState(false);
    return (
        <div className={classes.page}>
            {!isRegister ? <LoginComponent isRegister={() => (setIsRegister(true))}/> : <RegistrationComponent isRegister={() => (setIsRegister(false))}/>}
        </div>
    );
};

export default AuthPage;