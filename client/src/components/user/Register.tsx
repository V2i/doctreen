import * as React from 'react';
import TextField from "@mui/material/TextField";
import {Button, Stack} from "@mui/material";
import {ChangeEvent, FC, useState} from "react";
import {register} from "../../services/auth.service";
import {IState} from "../../App";
import { useHistory } from "react-router-dom"

const Register: FC = () => {

    const history = useHistory();
    const [user, setUser] = useState<IState['user']>({
        userMail: "",
        mailCheck: "",
        userName: "",
        userHashedPassword: ""
    });

    const handleInputsChange = (e: ChangeEvent<HTMLInputElement>): void => {
        if(e.target) {
            const { name, value } = e.target;
            setUser({
                ...user,
                [name]: value,
            });
        }
    };

    const handleRegister = (): void => {
        if(user.userName === "" || user.userHashedPassword === "" || user.userMail === "" || user.mailCheck === "" || user.userMail !== user.mailCheck) return
        register(user.userMail, user.userHashedPassword, user.userName);
        history.push("/login");
    };

    return (
        <>
            <h1>Register</h1>
            <Stack direction="column" spacing={3}>
                <TextField name="userMail" label="Email" variant="outlined" required value={user.userMail} onChange={handleInputsChange}/>
                <TextField name="mailCheck" label="Check Email" variant="outlined" required value={user.mailCheck} onChange={handleInputsChange}/>
                <TextField name="userName" label="User Name" variant="outlined" required value={user.userName} onChange={handleInputsChange}/>
                <TextField name="userPassword" label="Password" variant="outlined" required type="password" value={user.userHashedPassword} onChange={handleInputsChange}/>
                <Button variant="outlined" onClick={handleRegister}>Register</Button>
            </Stack>
        </>
    );
}

export default Register;
