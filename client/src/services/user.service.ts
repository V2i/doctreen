import axios from "axios";
import API_URL from "./API.URL";
import {IState} from "../App";

interface UserService {

}

export const getUsers = async () => {

    try {
        const res = await axios.get(`${API_URL}/user/list`);

        return res.data;

    } catch (e) {
        console.log(e);
    }

}

export const UpdateUser = async (user: IState["user"]) => {

    try {
        const res = await axios.patch(`${API_URL}/user/${user._id}`, user);

        return res.data;

    } catch (e) {
        console.log(e);
    }
}
