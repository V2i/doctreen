import axios from "axios";
import API_URL from "./API.URL";
import {IState} from "../App";

export const getUsers = async () => {

    try {
        let res = await axios.get(`${API_URL}/user/list`);

        return await res;

    } catch (e) {
        console.log(e);
    }

}

export const updateUser = async (user: IState["user"]) => {

    try {
        const res = await axios.patch(`${API_URL}/user/${user._id}`, user);

        localStorage.setItem("user", JSON.stringify(res.data));

    } catch (e) {
        console.log(e);
    }
}

export const reportUser = async (id: string) => {

    try {
        const res = await axios.patch(`${API_URL}/user/${id}`, {isReported: true});

    } catch (e) {
        console.log(e);
    }
}
