import React, { useEffect, useState } from 'react'
import NewPassword from '../presentation/NewPassword'
import useValidate from '../customHooks/useValidate'
import newPasswordFields from '../data/newPasswordFields'
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom'
import { enqueueSnackbar } from 'notistack'

const NewPasswordContainer = () => {
    const [password, setPassword] = useState({})
    const location = useLocation()
    const searchParams = new URLSearchParams(location.search)
    const accessToken = searchParams.get("token")
    const navigate = useNavigate()

    const checkToken = async () => {
        const checkResponse = await axios.get('https://examination.onrender.com/users/newPassword', {
            headers: {
                'access-token': accessToken
            }
        })

        if (checkResponse?.data?.statusCode === 200) {
            enqueueSnackbar(checkResponse?.data?.message || "you can set password now", { variant: 'success' })
        }
        else if (checkResponse?.data?.statusCode === 500) {
            enqueueSnackbar(checkResponse?.data?.message, { variant: 'info' })
        }
        else {
            enqueueSnackbar(checkResponse?.data?.message, { variant: 'error' })
        }
    }

    useEffect(() => {
        checkToken()
    }, [])

    const { validateInputs, error, checkValidations, manageError } = useValidate(password)
    const passArr = ["password", "confirmpassword"]

    const handleChange = (e) => {
        let { name, value, type } = e.target
        validateInputs(name, value, type)

        if (passArr.includes(name.toLowerCase())) {
            value = value.trim()
        }

        setPassword((prev) => {
            const newState = {
                ...prev,
                [name]: value
            }

            if (newState?.Password?.trim() && newState?.ConfirmPassword?.trim()) {
                if (newState?.Password !== newState?.ConfirmPassword) {
                    const msg = "password and confirm password are not same"
                    manageError(name, true, msg)
                }
                else {
                    manageError("Password", false)
                    manageError("ConfirmPassword", false)
                }
            }

            console.log("password", password);

            return newState
        })

        console.log("accessing the password object", password?.password !== password?.confirmpassword);
        console.log("error from password container", error);
    }

    console.log("passwords State", password);

    const passwordCall = async () => {

        let config = {
            method: 'post',
            url: `https://examination.onrender.com/users/ForgotPassword/Verify?token=${accessToken}`,
            data: password
        };

        try {
            const response = await axios.request(config)

            if (response?.data?.statusCode === 200) {
                enqueueSnackbar(response?.data?.message || "password set", { variant: 'success' })
                navigate('/')
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

    }

    console.log("error", error);

    const handlePassword = () => {
        checkValidations(newPasswordFields)

        let errorStatus = Object.values(error).some((cur) => cur.status === true)

        if (!errorStatus) {
            passwordCall()
        }
    }

    return (
        <>
            <NewPassword
                handlePassword={handlePassword}
                handleChange={handleChange}
                password={password}
                error={error}
            />
        </>
    )
}

export default NewPasswordContainer

// check this later