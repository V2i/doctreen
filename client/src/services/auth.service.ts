import axios from "axios";
import API_URL from "./API.URL";

export const login = async (userMail: string, userPassword: string) => {

    try {
        const res = await axios.post(`${API_URL}/login`, { userMail, userPassword });

        if(!(res.data.userInfo.isBanned)) {
            localStorage.setItem("user", JSON.stringify(res.data));
        }

    } catch (e) {
        console.log(e);
    }

};

export const logout = () => {
    localStorage.removeItem("user");
};

export const register = async (userMail: string, userPassword: string, userName: string) => {

    try {
        const res = await axios.post(`${API_URL}/register`, { userMail, userPassword, userName });

        return res.data;

    } catch (e) {
        console.log(e);
    }

};

export const getCurrentUser = () => {

    try {
        const user = localStorage.getItem("user");

        if(user) return JSON.parse(user);

        return null;

    } catch (e) {
        console.log(e);
    }

};
