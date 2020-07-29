import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getSignedIn } from './redux/users/selector';
import { listenAuthState } from './redux/users/operations';

const Auth = ({children}) => {
    const dispatch = useDispatch();
    const selector = useSelector((state) => state);
    const isSignedIn = getSignedIn(selector);

    useEffect(() => {
        if(!isSignedIn){
            dispatch(listenAuthState())
        }
    },[dispatch,isSignedIn]);

    if(!isSignedIn){
        return <></>
    }else{
        return children
    }
};

export default Auth;