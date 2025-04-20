import React, {useContext, useEffect, useState} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../../app/context.js";
import {getById, getMe} from "../../../features/API/OrganizerAPI.js";
import {toast} from "react-toastify";
import dayjs from "dayjs";
import classes from './profile.module.css'
import CustomButton from "../../UI/Button/CustomButton.jsx";
import EventCardInProfile from "../cards/eventCardInProfile/EventCardInProfile.jsx";
import {getMy} from "../../../features/API/EventAPI.js";
import CustomInput from "../../UI/Input/CustomInput.jsx";
import verify from '../../../assets/verify.png'
import UpdateParticipantProfileModal from "../modals/profileModal/updateParticipantProfileModal.jsx";
import ChangePasswordModal from "../modals/profileModal/changePasswordModal.jsx";
import UpdateOrganizerProfile from "../modals/profileModal/updateOrganizerProfile.jsx";
import SendAccredited from "../modals/profileModal/sendAccredited.jsx";

const OrganizerProfile = observer(({isMy, id}) => {
    const { organizer , event, user} = useContext(Context);
    const [isLoading, setIsLoading] = useState(true);
    const [update, setUpdate] = useState(false);
    const [pass, setPass] = useState(false);
    const [trigger, setTrigger] = useState(false);
    const [accredited, setAccredited] = useState(false);
    const [name, setName] = useState("");
    useEffect(() => {
        if (isMy) {
            getMe()
                .then(res => {
                    organizer.setMyProfile(res.profile); // или res, если так
                    setIsLoading(false);
                })
                .catch(err => {
                    toast.error(err?.response?.data?.message || "Что-то пошло не так при загрузке профиля");
                    setIsLoading(false);
                });

        } else {
            getById(id)
                .then(res => {
                    organizer.setAnotherProfile(res.profile); // или res
                    setIsLoading(false);
                })
                .catch(err => {
                    toast.error(err?.response?.data?.message || "Не удалось загрузить профиль участника");
                    setIsLoading(false);
                });
        }
    }, [id, isMy, organizer, trigger]);
    useEffect(() => {getMy(name).then((data) => {event.setMyEvents(data)}).catch(err => {
        toast.error(err?.response?.data?.message || "Что-то пошло не так при загрузке профиля");
        setIsLoading(false);
    });;}, [name, id, isMy, organizer])
    const organizerData = isMy ? organizer.myProfile : organizer.anotherProfile;

    if (isLoading || !organizerData) {
        return <div>Загрузка профиля...</div>;
    }
    const dateCreate = dayjs((organizerData.createdAt)).format('DD-MM-YYYY');
    return (
        <div className={classes.container}>
            <div>
                <h2>Профиль организатора</h2>
            </div>
            <div className={classes.page}>
                <div className={classes.logoContainer}>
                    <img height={200} width={200} style={{borderRadius: '50%'}}
                         src={`http://localhost:5000/` + organizerData?.logo} alt={organizerData.name || "Фото"}/>
                    {isMy ? <>
                        <CustomButton onClick={() => (setUpdate(true))}>Редактировать</CustomButton>
                        <CustomButton onClick={() => (setPass(true))}>Сменить пароль</CustomButton>
                        {!organizerData.isAccredited ? (<CustomButton onClick={() => (setAccredited(true))}>Аккредитация</CustomButton>) : null}</> : null}

                </div>
                <div >
                    <div className={classes.nameContainer}>
                        <div className={classes.nameElement}>
                            <div className={classes.verify}>
                                <h3>{organizerData.name} </h3>
                                {organizerData.isAccredited && (<img src={verify} alt="verify" style={{width: '20px', height: '20px'}}/>)}
                            </div>
                            <p>На сайте с {dateCreate}</p>
                        </div>
                        <div className={classes.nameElement}>
                            <p>Список мероприятий</p>


                        </div>
                    </div>
                    {!isMy ? <div className={classes.cardsContainer}>

                        {organizerData.events?.length > 0 ? (
                            organizerData.events?.map(event => (
                                <EventCardInProfile key={event.id} event={event}/>
                            ))
                        ) : <p>Событий пока нет</p>}
                    </div> : <div className={classes.cardsContainer}>
                        <CustomInput type='text' placeholder='Поиск' value={name} onChange={event => setName(event.target.value)}/>
                        {event._myEvents.length > 0 ? (
                            event._myEvents?.map(event => (
                                <EventCardInProfile key={event.id} event={event}/>
                            ))
                        ) : <p>Событий пока нет</p>}
                    </div>}

                </div>
            </div>
            {update && (<UpdateOrganizerProfile trigger={() => setTrigger(!trigger)} onClose={() => setUpdate(false)} oldData={organizerData}/>)}
            {pass && (<ChangePasswordModal onClose={() => (setPass(false))} role={user.role}/>)}
            {accredited && (<SendAccredited  onClose={() => (setAccredited(false))}/>)}
        </div>
    );
});
export default OrganizerProfile;