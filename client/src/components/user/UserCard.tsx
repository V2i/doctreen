import React, {Dispatch, FC, SetStateAction} from "react";
import {Button, Card, CardActions, CardContent, Typography} from "@mui/material";
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import BlockIcon from '@mui/icons-material/Block';
import {IState} from "../../App";
import {reportUser} from "../../services/user.service";

interface IProps {
    user: IState["user"],
}

const UserCard: FC<IProps> = (user) => {



    const handleReported = (): void => {
        if(user.user._id) reportUser(user.user._id);
    };

    const handleLiked = (): void => {

    };

    const handleBanned = (): void => {

    };

    return (
        <Card sx={{ minWidth: 350, maxWidth: 600, marginBottom: 10, borderRadius: 5, marginLeft: "auto", marginRight: "auto"}} >
            <CardContent>
                <Typography variant="h3" component="div">
                    {user.user.userName}
                </Typography>
                <Typography variant="body2">
                    User Description:
                    <br />
                    {user.user.userDescription ?
                        <>
                        {user.user.userDescription}
                        </>
                        :
                        <Typography sx={{ mb: 1.5, fontSize: 12 }} color="text.secondary">
                            No description
                        </Typography>
                    }
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={handleLiked}><FavoriteOutlinedIcon color="error"/></Button>
                <Button size="small" onClick={handleReported}><ReportProblemOutlinedIcon color="error" /></Button>
                <Button size="small" onClick={handleReported}><BlockIcon color="error" /></Button>
            </CardActions>
        </Card>
    );
}

export default UserCard;
