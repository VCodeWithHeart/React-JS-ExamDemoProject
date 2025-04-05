import React, { useState } from 'react'
import TeacherProfile from '../presentation/TeacherProfile'
import useValidate from '../customHooks/useValidate'
import newPasswordFields from '../data/newPasswordFields'
import { enqueueSnackbar } from 'notistack'
import { useAuth } from '../provider/AuthProvider'
import axios from 'axios'

const ProfileContainer = () => {
    const [passwordDetails, setPasswordDetails] = useState({})
    const { validateInputs, error, checkValidations, manageError } = useValidate(passwordDetails)
    const { token } = useAuth()

    let config = {
        method: 'post',
        url: 'https://examination.onrender.com/users/ResetPassword',
        headers: {
            'access-token': `${token}`,
            'Content-Type': 'application/json'
        },
        data: passwordDetails
    };

    const handleChange = (e) => {
        const { name, value, type } = e.target
        validateInputs(name, value, type)

        // setPasswordDetails((prev) => ({
        //     ...prev,
        //     [name]: value
        // }))

        setPasswordDetails((prev) => {
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

            console.log("passwordDetails", passwordDetails);

            return newState
        }
        )


        // setPassword((prev) => {
        //     const newState = {
        //         ...prev,
        //         [name]: value
        //     }

        //     if (password?.Password?.trim() && password?.ConfirmPassword?.trim()) {
        //         if (password?.Password !== password?.ConfirmPassword) {
        //             const msg = "password and confirm password are not same"
        //             manageError(name, true, msg)
        //             // manageError(name, true, msg)
        //         }
        //         else {
        //             manageError("Password", false)
        //             manageError("ConfirmPassword", false)
        //         }
        //     }

        //     console.log("password", password);

        //     return newState
        // })

    }

    const passwordCall = async () => {
        try {
            const response = await axios.request(config)

            if (response?.data?.statusCode === 200) {
                enqueueSnackbar(response?.data?.message, { variant: 'success' })
            }
            else if (response?.data?.statusCode === 500) {
                enqueueSnackbar(response?.data?.message, { variant: 'info' })
            }
            else {
                enqueueSnackbar(response?.data?.message, { variant: 'error' })
            }

            console.log("response", response)
        }
        catch (error) {
            console.log("error", error);
        }

    }

    const handlePassword = () => {
        checkValidations(newPasswordFields)
        let errorStatus = Object.values(error).some((cur) => cur.status === true)
        console.log("errorStatus", errorStatus);
        if (!errorStatus) {
            passwordCall()
        }
    }

    return (
        <>
            <TeacherProfile
                handlePassword={handlePassword}
                handleChange={handleChange}
                passwordDetails={passwordDetails}
                error={error}
            />
        </>
    )
}

export default ProfileContainer

// prev req
// const response = await axios.post("https://examination.onrender.com/users/ResetPassword", {
//     headers: {
//         'access-token': `${token}`,
//         'Content-Type': 'application/json'
//     },
//     data: passwordDetails
// })