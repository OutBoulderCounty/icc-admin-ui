import React from 'react';

import ProvideEmail from './signup/provideEmail';
import AuthConsumer from '../context/authContext';
import { Navigate } from 'react-router';


const Login: React.FC = () => {
    const { authed } = AuthConsumer();

    return (
        <>
            <div className="overflow-y-scroll overflow-x-hidden flex-grow">
                {authed ? <Navigate to="/" /> : <ProvideEmail />}
            </div>
        </>
    );
};

export default Login;
