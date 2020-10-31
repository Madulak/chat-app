import { Button } from '@material-ui/core';
import React from 'react';

import classes from './Login.module.css';

import logo from './templatemo_logo-removebg-preview.png';

import * as signInActions from '../../store/actions';
import { useDispatch } from 'react-redux';

const Login = () => {

    const dispatch = useDispatch();

    const signIn = () => {
        dispatch(signInActions.signin());
    }

    return (
        <div className={classes.Login}>
            <div className={classes.Login__Container}>
                <img src={logo} />
                <div>
                    <h1>Sign in to Chat</h1>
                </div>
                <Button className={classes.Button} onClick={signIn} type='submit'>
                    Sign In With Google
                </Button>
            </div>
        </div>
    );
}

export default Login;