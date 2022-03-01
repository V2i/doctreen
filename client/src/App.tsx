import React, {useEffect, useState} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import './App.css';
import NavBar from "./components/NavBar";
import Dashboard from "./components/Dashboard";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import User from "./components/user/User";
import UserList from "./components/user/UserList";
import {getCurrentUser} from "./services/auth.service";

export interface IState {
    user: {
        _id?: string,
        userMail: string,
        mailCheck?: string,
        userName: string,
        userHashedPassword: string,
        isAdmin?: boolean,
        isModerator?: boolean,
        userDescription?: string,
        isReported?: boolean,
        isBanned?: boolean,
        userLiked?: string[],
    },
    users: {
        _id?: string,
        userMail: string,
        mailCheck?: string,
        userName: string,
        userHashedPassword: string,
        isAdmin?: boolean,
        isModerator?: boolean,
        userDescription?: string,
        isReported?: boolean,
        isBanned?: boolean,
        userLiked?: string[],
    }[],
}

function App() {

    const userCookie = getCurrentUser();
    const [isLogged, setIsLogged] = useState<boolean>(false);
    const [user, setUser] = useState<IState['user']>({
        userMail: "",
        userName: "guest",
        userHashedPassword: ""
    });

    useEffect(() => {
        if (userCookie) {
            setIsLogged(true);
            setUser(userCookie.userInfo);
        }
    }, [userCookie]);

  return (
    <div>
        <nav>
            <NavBar isLogged={isLogged} setIsLogged={setIsLogged}/>
        </nav>
        <div className="App">
            <Switch>
                <Route path={"/login"} exact>
                    <Login setIsLogged={setIsLogged}/>
                </Route>
                <Route path={"/register"} exact component={Register} />
                <Route path={"/user"} exact >
                    <User user={user} setUser={setUser} />
                </Route>
                <Route path={"/users"} exact >
                    <UserList />
                </Route>

                <Route path={"/"} exact component={Dashboard} />
                <Redirect to={"/"}/>
            </Switch>
        </div>
    </div>
  );
}

export default App;
