import * as React from 'react';
import TextField from '@mui/material/TextField';
import {Button, Stack, Typography} from "@mui/material";
import {ChangeEvent, FC, useState} from "react";
import {getCurrentUser, login} from "../../services/auth.service";
import { useHistory } from "react-router-dom"

interface IProps {
    setIsLogged: (value: boolean | ((prevVar: boolean) => boolean)) => void
}

const Login: FC<IProps> = ({setIsLogged}) => {

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [isBanned, setIsBanned] = useState<boolean>(false);
    const history = useHistory();

    const handleMailChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setPassword(e.target.value);
    };

    const handleLogin = ():void => {
        if(email === "" || password === "") return
        login(email, password);
        const user = getCurrentUser();
        if (user.userInfo.isBanned) {
            setIsBanned(true);
        } else {
            setIsLogged(true);
            history.push("/");
        }
        setEmail("");
        setPassword("");
    };

    return (
        <>
            <h1>Login</h1>
            <Stack direction="column" spacing={3}>
                <TextField name="email" label="Email" variant="outlined" required value={email} onChange={handleMailChange}/>
                <TextField name="password" label="Password" variant="outlined" required type="password" value={password} onChange={handlePasswordChange}/>
                <Button variant="outlined" onClick={handleLogin}>Login</Button>
                {isBanned ?
                    <Typography sx={{ fontSize: 16 }} color="red" gutterBottom>
                        You are banned !
                    </Typography>
                    :
                    <></>
                }
            </Stack>
        </>
    );
}

export default Login;
