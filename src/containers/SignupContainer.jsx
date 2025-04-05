import React, { useState } from 'react'
import Signup from '../presentation/Signup'
import useValidate from '../customHooks/useValidate';
import axios from 'axios';
import signupFields from '../data/signupFields';
import { enqueueSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import PreLoader from '../presentation/PreLoader';

const SignupContainer = () => {
    const [signup, setSignup] = useState({})
    const [response, setResponse] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const passArr = ["password", "confirmpassword"]

    const { validateInputs, error, checkValidations } = useValidate(signup)

    const handleChange = (e) => {
        let { name, value, type } = e.target
        validateInputs(name, value, type)

        if (passArr.includes(name.toLowerCase())) {
            value = value.trim()
        }

        setSignup((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const signupCall = () => {
        setLoading(true)

        const response = axios.post('https://examination.onrender.com/users/SignUp', signup).then((res) => {
            console.log("res", res)
            res?.data?.statusCode === 200 ? (enqueueSnackbar(res?.data?.message, { variant: 'success' }, navigate('/')))
                : enqueueSnackbar(res?.data?.message, { variant: 'error' })

            setLoading(false)
        }).catch((err) => {
            console.log("error", err);
        })
        setResponse(response)
    }

    console.log("error", error);

    console.log('loading', loading);

    const handleSignUp = () => {
        checkValidations(signupFields)

        if (Object.values(error).length) {
            const errorStatus = Object.values(error).some((cur) => cur.status === true)
            console.log("errorStatus", errorStatus)

            if (!errorStatus) {
                signupCall()
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
                        <Signup
                            handleSignUp={handleSignUp}
                            signupCall={signupCall}
                            handleChange={handleChange}
                            signup={signup}
                            error={error}
                        />
                    </>
                )
            }
        </>
    )
}

export default SignupContainer