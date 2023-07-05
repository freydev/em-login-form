import './App.css';
import {CreateAccountPage, LoginPage} from './features/auth';
import {Navigate, Route, BrowserRouter, Routes} from 'react-router-dom';
import React from 'react';
import {NotifyProvider} from '@src/components';

function App() {
    window.fetch = async (url, options) =>
        new Promise(resolve => {
            setTimeout(() => {
                const body = JSON.parse(options.body);
                if (/login/.test(url)) {
                    if (body['email'] === 'johndoe@mail.com' &&
                        body['password'] === 'password'
                    ) {
                        return resolve({
                            ok: true
                        })
                    } else {
                        return resolve({
                            ok: false,
                            json: () => Promise.resolve({
                                details: {
                                    'email': 'Wrong email or password'
                                }
                            })
                        })
                    }
                }
                if (/register/.test(url)) {
                    if (body['email'] === 'johndoe@mail.com') {
                        return resolve({
                            ok: false,
                            json: () => Promise.resolve({
                                details: {
                                    'email': 'This email address already exist'
                                }
                            })
                        })
                    }
                    return resolve({
                        ok: true
                    })
                }
            }, 1000)
        })

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="login" element={LoginPage}/>
                    <Route path="register" element={CreateAccountPage}/>
                    <Route path="*" element={<Navigate to="/login"/>}/>
                </Routes>
            </BrowserRouter>
            <NotifyProvider/>
        </div>
    );
}

export default App;
