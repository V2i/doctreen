import React from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import './App.css';
import NavBar from "./components/NavBar";
import Dashboard from "./components/Dashboard";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import User from "./components/user/User";
import UserList from "./components/user/UserList";


function App() {
  return (
    <div>
        <nav>
            <NavBar/>
        </nav>
        <div className="App">
            <Switch>
                <Route path={"/login"} exact component={Login} />
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
