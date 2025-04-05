import React, { useState } from 'react'
import Login from '../presentation/Login'
import useValidate from '../customHooks/useValidate'
import loginFields from '../data/loginFields'
import axios from 'axios'
import { enqueueSnackbar } from 'notistack'
import { useAuth } from '../provider/AuthProvider'
import { useNavigate } from 'react-router-dom'
import PreLoader from '../presentation/PreLoader'

const LoginContainer = ({ role }) => {
    const [login, setLogin] = useState({})
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const { token, tokenSetter } = useAuth()

    const { validateInputs, error, checkValidations } = useValidate(login)

    const handleChange = (e) => {
        let { name, value, type } = e.target

        console.log("login", login);

        if (name === "password") {
            value = value.trim()
        }

        validateInputs(name, value, type)

        setLogin((prev) => ({
            ...prev,
            [name]: value
        }))

    }

    const loginCall = async () => {
        setLoading(true)
        try {
            const response = await axios.post('https://examination.onrender.com/users/Login', login)

            if (response?.data?.statusCode === 200) {
                enqueueSnackbar(response?.data?.message, { variant: 'success' })
                tokenSetter(response?.data?.data?.token)
                localStorage.setItem("role", `${response?.data?.data?.role}`)
                role === "student" ? navigate('/student/dashboard') : navigate('/teacher/dashboard')
            }
            else if (response?.data?.statusCode === 500) {
                enqueueSnackbar(response?.data?.message, { variant: 'info' })
            }
            else {
                enqueueSnackbar(response?.data?.message, { variant: 'error' })
            }
        }
        catch (error) {
            console.log("error", error);
        }

        setLoading(false)
    }

    console.log("error", error);

    const handleLogin = () => {
        checkValidations(loginFields)

        console.log("error values", Object.values(error))

        if (Object.values(error).length) {
            const errorStatus = Object.values(error).some((cur) => cur.status === true)
            console.log("errorStatus", errorStatus)

            if (!errorStatus) {
                loginCall()
            }
        }
    }

    return (
        <>
            {
                loading ? (
                    <>
                        <PreLoader />
                    </>
                ) : (
                    <>
                        <Login
                            handleLogin={handleLogin}
                            loginCall={loginCall}
                            handleChange={handleChange}
                            login={login}
                            error={error}
                        />
                    </>
                )
            }
        </>
    )
}

export default LoginContainer
