import axios from "axios";
import API_URL from "./API.URL";

export const login = async (userMail: string, userPassword: string) => {

    try {
        const res = await axios.post(`${API_URL}/login`, { userMail, userPassword });

        localStorage.setItem("user", JSON.stringify(res.data));

        return res.data;

    } catch (e) {
        console.log(e);
    }

};

export const logout = async () => {
    await localStorage.removeItem("user");
};

export const register = async (userMail: string, userPassword: string, userName: string) => {

    try {
        const res = await axios.post(`${API_URL}/register`, { userMail, userPassword, userName });

        return res.data;

    } catch (e) {
        console.log(e);
    }

};

export const getCurrentUser = async () => {

    try {
        const user = await localStorage.getItem("user");

        if(user) return JSON.parse(user);

        return null;

    } catch (e) {
        console.log(e);
    }

};
