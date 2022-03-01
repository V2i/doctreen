import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {IState} from "../../App";
import {ChangeEvent, Dispatch, FC, SetStateAction, useState} from "react";
import {FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Stack, TextField} from "@mui/material";
import {updateUser} from "../../services/user.service";
import {getCurrentUser} from "../../services/auth.service";

interface IProps {
    user: IState["user"],
    setUser: Dispatch<SetStateAction<IState["user"]>>
}

const User: FC<IProps> = (user, setUser) => {

    const [editing, setEditing] = useState(false);

    const handleInputsChange = (e: ChangeEvent<HTMLInputElement>): void => {
        if(e.target) {
            const { name, value } = e.target;
            setUser({
                ...user,
                [name]: value,
            });
        }
    };

    const handleEdit = (): void => {
        setEditing(!editing);
    }

    const handleUpdate = (): void => {
        updateUser(user.user);
        const updatedUser = getCurrentUser();
        setUser(updatedUser);
        setEditing(false);
    }

    return (
        <>
            <Box sx={{ minWidth: 275 }}>
                <h1>User</h1>
                <Card variant="outlined">
                    <CardContent>
                        {editing ?
                            <>
                                <Stack direction="column" spacing={2}>
                                    <TextField name="userName" label="User Name" variant="outlined" value={user.user.userName} onChange={handleInputsChange}/>
                                    <TextField name="userDescription" label="Description" variant="outlined" value={user.user.userDescription} onChange={handleInputsChange}/>
                                </Stack>
                            </>
                            :
                            <>
                                <Typography variant="h3" color="text.primary" gutterBottom>
                                    User Name: {user.user.userName}
                                </Typography>
                                <Typography variant="h5" component="div">
                                    User Email: {user.user.userMail}
                                </Typography>
                                <Typography variant="h6" component="div">
                                    User Description:
                                    <br/>
                                    {user.user.userDescription}
                                </Typography>
                            </>
                        }

                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            <FormControl>
                                <FormLabel id="demo-row-radio-buttons-group-label">User Status:</FormLabel>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group"
                                >
                                    <FormControlLabel disabled value={user.user.isAdmin} control={<Radio />} label="Admin" />
                                    <FormControlLabel disabled value={user.user.isModerator} control={<Radio />} label="Moderator" />
                                    <FormControlLabel disabled value={!(user.user.isAdmin && user.user.isModerator)} control={<Radio />} label="User" />
                                </RadioGroup>
                                <RadioGroup
                                    row
                                    aria-labelledby="demo-row-radio-buttons-group-label"
                                    name="row-radio-buttons-group2"
                                >
                                    <FormControlLabel disabled value={user.user.isBanned} control={<Radio />} label="Banned" />
                                    <FormControlLabel disabled value={user.user.isReported} control={<Radio />} label="Reported" />
                                    <FormControlLabel disabled value={!(user.user.isBanned && user.user.isReported)} control={<Radio />} label="Clear" />
                                </RadioGroup>
                            </FormControl>
                        </Typography>
                    </CardContent>
                    <CardActions>
                        {editing ?
                            <>
                                <Button size="small" onClick={handleUpdate}>Save</Button>
                                <Button size="small" onClick={handleEdit} color="error">Cancel</Button>
                            </>
                            :
                            <Button size="small" onClick={handleEdit}>Edit</Button>
                        }
                    </CardActions>
                </Card>
            </Box>
        </>
    );
}

export default User;
