import {Button, Input} from '@src/components';
import {EmailIcon, SecurityIcon} from '@src/components/icons';
import {Social} from '../social';
import React, {useRef, useState} from 'react';
import styled from '@emotion/styled';
import {useLocation} from 'react-router';
import {emailValidate, requiredValidate, validate} from '@src/validators';
import {notify} from '@src/components/notify';


const HrWithLabel = styled.div`
  width: 100%;
  height: .75em;
  border-bottom: 1px solid black;
  text-align: center;
  opacity: .6;

  span {
    font-size: 1em;
    background-color: var(--default-bg);
    padding: 0 10px;
  }
`

export function Login() {
    const location = useLocation();
    const params =
        new URLSearchParams(location.search);

    const [errors, setErrors] = useState({})
    const ref = useRef(null)
    const [loading, setLoading] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData(ref.current);
        setErrors({});
        try {
            await validate(form, 'email', [
                requiredValidate('Please provide your email'),
                emailValidate('Invalid email')
            ]);
            await validate(form, 'password', [
                requiredValidate('Please provide your password'),
            ]);

            const body = {}
            for (const [key, value] of form) {
                body[key] = value;
            }

            setLoading(true);
            const response = await fetch('/login', {method: 'POST', body: JSON.stringify(body)});
            if (response.ok) {
                notify('success', 'Login successful');
            } else {
                setErrors((await response.json()).details)
            }
        } catch (e) {
            if (e.errors) {
                setErrors(e.errors)
            } else {
                throw e
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <form onSubmit={onSubmit} ref={ref} noValidate>
            <h1 className="text-xl font-black">Login to your Account</h1>
            <h4 className="text-sm">Welcome to our site</h4>
            <div className="py-4 flex flex-col gap-2">
                <Input autoComplete="name" error={errors.email} required defaultValue={params.get('registered')}
                       icon={<EmailIcon/>}
                       label="Email" name="email" type="email" placeholder="johndoe@mail.com"/>
                <Input autoComplete="off" error={errors.password} required password icon={<SecurityIcon/>}
                       label="Password"
                       name="password" placeholder="password" type="password"/>
            </div>
            <div className="flex flex-col gap-2 mt-3">
                <Button default loading={loading} primary className="w-full">Continue</Button>
                <HrWithLabel>
                    <span>OR</span>
                </HrWithLabel>
                <Social/>
                <div className="text-xs text-center">Don't have an account? <a href="/register">Create one</a></div>
            </div>
        </form>
    )
}
