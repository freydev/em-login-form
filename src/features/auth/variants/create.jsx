import {Button, Input} from '@src/components';
import {EmailIcon, SecurityIcon, UserIcon} from '@src/components/icons';
import React, {useRef, useState} from 'react';
import {useNavigate} from 'react-router';
import {emailValidate, minValidate, requiredValidate, validate} from '@src/validators';
import {notify} from '@src/components/notify';


export function CreateAccount() {
    const [errors, setErrors] = useState({})
    const ref = useRef(null)
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData(ref.current);
        setErrors({});
        try {
            await validate(form, 'user', [requiredValidate('Please provide your name')])
            await validate(form, 'email', [
                requiredValidate('Please provide your email'),
                emailValidate('Invalid email')
            ]);
            await validate(form, 'password', [
                requiredValidate('Please provide your password'),
                minValidate('Password minimum length is 6 symbols', 6)
            ]);

            const body = {}
            for (const [key, value] of form) {
                body[key] = value;
            }

            setLoading(true);
            const response = await fetch('/register', {method: 'POST', body: JSON.stringify(body)});
            if (response.ok) {
                notify('success', 'You have successfully created an account')
                navigate(`/login?registered=${body.email}`)
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
        <form noValidate onSubmit={onSubmit} name="register" ref={ref}>
            <h1 className="text-xl font-black">Create your new Account</h1>
            <h4 className="text-sm">Welcome to our site</h4>
            <div className="py-4 flex flex-col gap-2">
                <Input autoComplete="email" error={errors.user} required icon={<UserIcon/>} label="Username" name="user"
                       type="text" placeholder="John Doe"/>
                <Input autoComplete="name" error={errors.email} required icon={<EmailIcon/>} label="Email" name="email"
                       type="email"
                       placeholder="johndoe@mail.com"/>
                <Input autoComplete="off" error={errors.password} required password icon={<SecurityIcon/>}
                       label="Password" name="password" placeholder="password"
                       type="password"/>
            </div>
            <div className="flex flex-col gap-2 mt-3">
                <Button loading={loading} default primary className="w-full">Create Account</Button>
                <div className="text-xs text-center">Already have an account? <a href="/login">Login</a></div>
            </div>
        </form>
    )
}
