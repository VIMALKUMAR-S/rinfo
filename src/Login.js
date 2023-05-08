import React, { useState } from 'react'
import './styles/Login.scss'
import { toast } from 'react-toastify';

import { useNavigate } from 'react-router';
import axios from './api/axios';
import { useRecoilState } from 'recoil';
import { tokenState } from './atoms/auth';
import Logo from './img/result.png'

const Login = () => {
    const [name, setName] = useState("")

    const [password, setPassword] = useState("")
    const [token, setToken] = useRecoilState(tokenState)
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post(
            '/log-in',
            {
                email: name,
                password: password
            }

        ).then((res) => {

            if (res.data.msg === 'Login Successful') {
                setToken(res.data.data)
                localStorage.setItem('jwt', res.data.data.jwt)
                localStorage.setItem('refresh', res.data.data.refreshToken)
                toast.success("Login Successful")
                navigate('../admin')
            }
            else {
                console.log("else" + JSON.stringify(res))
                toast.error(res.data.msg)
            }
        }).catch((err) => {
            toast.error(err.data.msg)
        })

    }
    return (



        <main className='main-container'>

            <section className='form-container'>
                <section className='logo-wrapper'>
                    <img src={Logo}></img>
                </section>
                <form className='login-form'>
                    <input
                        placeholder='Enter the email'
                        value={name}
                        onChange={(event) => {
                            console.log(event.target.value)
                            setName(event.target.value)
                        }}

                    />
                    <input placeholder='Enter the password'
                        value={password}
                        onChange={(event) => {
                            setPassword(event.target.value)
                        }}

                    />
                    <button onClick={handleSubmit}>Login</button>
                </form>
            </section>

        </main>

    )
}

export default Login
