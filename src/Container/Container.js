import React, { Fragment, useEffect } from 'react';
import classes from './Container.module.css';

import Sidebar from '../Components/Sidebar/Sidebar';
import Chat from '../Components/Chat/Chat';
import Login from '../Components/Login/Login';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Container = () => {

    const isLogged = useSelector(state => state.user.user);

    useEffect(() => {

    },[isLogged])


    return (
        <Fragment>
            {isLogged ? 
            (<div className={classes.Container}>
                <div className={classes.Body}>
                    <Router>
                        <Sidebar />
                        {/* <Chat /> */}
                        <Switch>
                            <Route path='/rooms/:roomId' component={Chat}>
                                {/* <Chat /> */}
                            </Route>
                            <Route path='/'>
                                <Chat />
                            </Route>
                        </Switch>
                    </Router>
                    
                </div>
            </div>) :
            <Login />
        }
        </Fragment>
    );
}

export default Container;