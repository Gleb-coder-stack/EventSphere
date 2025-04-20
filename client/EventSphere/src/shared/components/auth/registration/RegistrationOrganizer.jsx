import React, {useContext} from 'react';
import {Context} from "../../../../app/context.js";
import {useNavigate} from "react-router-dom";
import {registration} from "../../../../features/API/OrganizerAPI.js";
import {toast} from "react-toastify";
import {HOME_PAGE} from "../../../constants/const.js";
import {observer} from "mobx-react-lite";
import RegistrationForm from "../forms/registrationForm.jsx";
import CustomButton from "../../../UI/Button/CustomButton.jsx";
import classes from '../login/loginCom.module.css'

const RegistrationOrganizer = observer(({setRoleToEntry, isLogin}) => {
    const {user} = useContext(Context);
    const navigate = useNavigate();
    const dataInForm = async (name, email, password) => {
        try{
            const data = await registration({name, email, password});
            user.setUser(data.id);
            user.setRole(data.role);
            user.setIsAuth(true)
            toast.success(data.message);
            navigate(HOME_PAGE)
        }catch(err){
            toast.error(err?.response?.data?.message || "Что то пошло не так");
        }
    }
    const clickToOrganizer = () => {
        setRoleToEntry('participant')
    }
    const clickToLogin = () => {
        isLogin()
    }
    return (
        <div className={classes.container}>
            <div className={classes.mainContainer}>
                <h2>Регистрация организатора</h2>
                <RegistrationForm onClickToEntry={dataInForm}/>
            </div>
            <div className={classes.buttons}>
                <CustomButton onClick={clickToOrganizer}>Регистрация участника</CustomButton>
                <CustomButton onClick={clickToLogin}>Назад ко входу</CustomButton>
            </div>
        </div>
    );
});

export default RegistrationOrganizer;