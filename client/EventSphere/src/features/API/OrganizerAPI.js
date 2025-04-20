import {$authHost, $host} from "./index.js";
import {jwtDecode} from "jwt-decode";

export const getMe = async () => {
    try{
        const {data} = await $authHost.get(`api/organizer/me`);
        return data;
    }catch(error){
        throw error;
    }
}

export const getById = async (id) => {
    try{
        const {data} = await $host.get(`api/organizer/${id}`);
        return data;
    }catch(error){
        throw error;
    }
}

export const registration = async (newData) => {
    try{
        const {data} = await $host.post(`api/organizer/registration`, newData);
        localStorage.setItem("token", data.token);
        return ({token: jwtDecode(data.token), message: data.message})
    }catch(error){
        throw error;
    }
}

export const loginOrganizer = async ({email, password}) => {
    try{
        const {data} = await $host.post(`api/organizer/login`, {email, password});
        localStorage.setItem("token", data.token);
        return ({token: jwtDecode(data.token), message: data.message})
    }catch(error){
        throw error;
    }
}

export const checkVersionJwtOrganizer = async ({id, versionJwt}) => {
    try{
        const {data} = await $host.post(`api/organizer/checkJwt`, {id, versionJwt});
        return data;
    }catch(error){
        throw error;
    }
}

export const updateOrganizer = async (newData) => {
    try{
        const {data} = await $authHost.put(`api/organizer/update`, newData);
        return data;
    }catch(error){
        throw error;
    }
}

export const changePasswordOrganizer = async ({oldPassword, newPassword}) => {
    try{
        const {data} = await $authHost.put(`api/organizer/change-password`, {oldPassword, newPassword});
        return data;
    }catch(error){
        throw error;
    }
}


export const deleteParticipant = async () => {
    try{
        const {data} = await $authHost.delete(`api/organizer/delete`);
        return data;
    }catch(error){
        throw error;
    }
}