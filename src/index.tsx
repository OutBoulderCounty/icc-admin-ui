import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { SessionProvider } from './context/sessionContext';
import { AuthProvider } from './context/authContext';

ReactDOM.render(
    <React.StrictMode>
      <SessionProvider>
        <AuthProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
        </AuthProvider>
        </SessionProvider>
    </React.StrictMode>,
    document.getElementById('root')
);
