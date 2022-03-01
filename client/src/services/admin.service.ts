import axios from "axios";
import API_URL from "./API.URL";
import {IState} from "../App";

export const adminUpdateUser = async (user: IState["user"]) => {

    try {
        const res = await axios.patch(`${API_URL}/admin/${user._id}`, user);

        return res.data;

    } catch (e) {
        console.log(e);
    }
}
