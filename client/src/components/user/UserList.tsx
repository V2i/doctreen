import * as React from 'react';
import {FC, useEffect, useState} from "react";
import {getUsers} from "../../services/user.service";
import UserCard from "./UserCard";
import {IState} from "../../App";
import {Grid} from "@mui/material";

const UserList: FC = () => {

    const [users, setUsers] = useState<IState['users']>([]);

    const fetchUser = () => {
        getUsers()
            .then((res) => {
                // @ts-ignore
                const users = res.data;
                setUsers(users);
            });
    }

    useEffect(() => {
        fetchUser();
    }, [users]);

    return (
        <>
            <h1>UserList</h1>
            <Grid>
                {users.map(u => <UserCard user={u} />)}
            </Grid>
        </>
    );
}

export default UserList;
