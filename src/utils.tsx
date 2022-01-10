import React, { useEffect } from 'react';
import { Navigate } from 'react-router';
import AuthConsumer from './context/authContext';

export const LOCAL_STORAGE_SESSION_TOKEN = 'sessionToken';
export const LOCAL_STORAGE_SIGN_UP_INFO = 'signUpInfo';
export const LOCAL_STORAGE_SIGN_UP = 'signUp';

type Props = {
    children?: React.ReactNode;
};

const ProtectedRoute: React.FC<Props> = ({ children }: Props) => {
    const existingSessionToken = localStorage.getItem(
        LOCAL_STORAGE_SESSION_TOKEN
    );
    const { authed, login, logout } = AuthConsumer();

    useEffect(() => {
        if (existingSessionToken && !authed) {
            (async () => {
              try {
                await getUserInfo()
                await login();
              } catch (e) {
                await logout()
                window.location.href = '/login';
              }
            })();
          }
    });

    return (authed || existingSessionToken) ? <>{children}</> : <Navigate to="/login" />;
};

export const authenticateUserToken = async (
    token: string,
    login: () => void
) => {
    const authResponse = await fetch(
        process.env.REACT_APP_API_ENDPOINT + '/authenticate',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: token,
            }),
        }
    );
    const authData = await authResponse.json();
    if (authData.error) {
        throw new Error(authData.error);
    }

    const sessionToken = authData.session_token;
    localStorage.setItem(LOCAL_STORAGE_SESSION_TOKEN, sessionToken);
    await login();
};

export const getUserInfo = async () => {
    const sessionToken = localStorage.getItem(LOCAL_STORAGE_SESSION_TOKEN);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', sessionToken ? sessionToken : '');
    const response = await fetch(process.env.REACT_APP_API_ENDPOINT + '/user', {
        method: 'GET',
        headers: headers,
    });
    const userInfoData = await response.json();
    if (userInfoData.error) {
        throw new Error(userInfoData.error);
    }

    localStorage.setItem(
        LOCAL_STORAGE_SIGN_UP_INFO,
        JSON.stringify(userInfoData.user).replace(/&apos;/g, "'")
    );
};

export const requiredInfoCheck = async () => {
    const signUpInfo = JSON.parse(
        localStorage.getItem(LOCAL_STORAGE_SIGN_UP_INFO) || '{}'
    );
    if (!signUpInfo.agreement_accepted) {
        alert('Please complete the sign up process');
        window.location.href = '/complete-sign-up';
    }
};

export const updateUserInfo = async () => {
    const sessionToken = localStorage.getItem(LOCAL_STORAGE_SESSION_TOKEN);
    const signUpInfo = JSON.parse(
        localStorage.getItem(LOCAL_STORAGE_SIGN_UP_INFO) || '{ "noData": true }'
    );
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', sessionToken ? sessionToken : '');

    if (!signUpInfo.noData) {
        signUpInfo.address = `${signUpInfo.street};${signUpInfo.city};${signUpInfo.state};${signUpInfo.zip}`;

        const res = await fetch(process.env.REACT_APP_API_ENDPOINT + '/user', {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(signUpInfo).replace(/[']/g, '&apos;'),
        });
        const userInfoData = await res.json();
        if (userInfoData.error) {
            throw new Error(userInfoData.error);
        }
        localStorage.setItem(
            LOCAL_STORAGE_SIGN_UP_INFO,
            JSON.stringify(userInfoData.user).replace(/&apos;/g, "'")
        );
    }

    if (signUpInfo.agreement_accepted) {
        const res = await fetch(process.env.REACT_APP_API_ENDPOINT + '/user/agreement/true', {
            method: 'PUT',
            headers: headers,
        })
        const agreementStatus = await res.json();
        if (agreementStatus.error) {
            throw new Error(agreementStatus.error);
        }
    }
};

export const getForm = async (formId: string | undefined) => {
    const sessionToken = localStorage.getItem(LOCAL_STORAGE_SESSION_TOKEN);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', sessionToken ? sessionToken : '');

    const response = await fetch(
        process.env.REACT_APP_API_ENDPOINT + `/form/${formId}`,
        {
            method: 'GET',
            headers: headers,
        }
    );
    const data = await response.json();
    if (data.error) {
        throw new Error(data.error);
    }
    return data.form;
};

export const saveForm = async (formData: any) => {
    const sessionToken = localStorage.getItem(LOCAL_STORAGE_SESSION_TOKEN);
    const responses = [];
    const errors = [];

    for (let element of formData) {
        if (element.value || element.option_ids) {
            const headers = new Headers();
            headers.append('Content-Type', 'application/json');
            headers.append('Authorization', sessionToken ? sessionToken : '');
            const response = await fetch(
                process.env.REACT_APP_API_ENDPOINT + `/response`,
                {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify(updatedElement(element)),
                }
            );
            const data = await response.json();
            if (data.error) {
              errors.push(data.error);
            } else {
              responses.push(data.response);
            }
        }
    }
    if (errors.length > 0) {
        throw new Error(errors.join('\n'));
    }
    return responses;
};

const updatedElement = (element: any) => {
    if (element.option_ids) {
        return {
            element_id: element.id,
            option_ids: element.option_ids,
        };
    } else {
        return {
            element_id: element.id,
            value: element.value,
        };
    }
};

export default ProtectedRoute;
