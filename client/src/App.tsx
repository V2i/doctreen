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
        userMail: string,
        mailCheck?: string,
        userName: string,
        userPassword: string,
        isAdmin?: boolean,
        isModerator?: boolean,
        userDescription?: string,
        isReported?: boolean,
        isBanned?: boolean,
        userLiked?: string[],
    },
}

function App() {

    const [isLogged, setIsLogged] = useState<boolean>(false);
    const user = getCurrentUser();

    useEffect(() => {
        if (user) setIsLogged(true)
    }, []);

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
                <Route path={"/user"} exact component={User} />
                <Route path={"/users"} exact component={UserList} />

                <Route path={"/"} exact component={Dashboard} />
                <Redirect to={"/"}/>
            </Switch>
        </div>
    </div>
  );
}

export default App;
