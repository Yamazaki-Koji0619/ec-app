import React,{useCallback, useState} from'react';
import {TextInput, PrimaryButton} from '../components/UIkit/index';
import { signIn } from '../redux/users/operations'; 
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
// import SignUp from './SignUp';
// import Reset from './Reset';

const SignIn = () => {
    const dispatch = useDispatch();

    const [email, setEmail] = useState(''),
          [password, setPassword] = useState('');

    const inputEmail = useCallback((event) => {
        setEmail(event.target.value)
    },[setEmail]);

    const inputPassword = useCallback((event) => {
        setPassword(event.target.value)
    },[setPassword]);

    return(
        <div className="c-section-container">
            <h2 className="u-text__headline u-text-center">サインイン</h2>
            <div className="module-spacer--medium" />
            <TextInput
                fullWidth={true} label={"メールアドレス"} multiline={false} required={true}
                rows={1} value={email} type={"email"} onChange={inputEmail}
            />
            <TextInput
                fullWidth={true} label={"パスワード"} multiline={false} required={true}
                rows={1} value={password} type={"password"} onChange={inputPassword}
            />
            <div className="module-spacer--medium" />
            <div className="center">
                <PrimaryButton
                    label={"Sign In"} 
                    onClick={() => dispatch(signIn(email, password))}
                />
                <div className="module-spacer--medium" />
                <p onClick={() => dispatch(push('signup'))}>アカウントをお持ちでない方はこちら</p>
                <p onClick={() => dispatch(push('signin/reset'))}>パスワードをお忘れの方はこちら</p>
            </div>
        </div>
    )
}

export default SignIn;