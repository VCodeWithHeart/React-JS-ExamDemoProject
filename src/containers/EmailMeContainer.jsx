import React, { useState } from 'react'
import EmailMe from '../presentation/EmailMe'
import useValidate from '../customHooks/useValidate'
import emailMeFields from '../data/emailMeFields'
import axios from 'axios'
import { enqueueSnackbar } from 'notistack'

const EmailMeContainer = () => {
    const [email, setEmail] = useState('')

    const { validateInputs, error, checkValidations } = useValidate(email)

    const handleChange = (e) => {
        const { name, value, type } = e.target
        validateInputs(name, value, type)

        setEmail((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const sendMail = async () => {
        try {
            const response = await axios.post('https://examination.onrender.com/users/ForgotPassword', email)

            if (response?.data?.statusCode === 200) {
                enqueueSnackbar(response?.data?.message, { variant: 'success' })
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

    const handleMail = () => {
        checkValidations(emailMeFields)
        let errorStatus = Object.values(error).some((cur) => cur.status === true)

        if (!errorStatus) {
            sendMail()
        }
    }

    console.log("email", email)

    return (
        <>
            <EmailMe
                handleMail={handleMail}
                handleChange={handleChange}
                email={email}
                error={error}
            />
        </>
    )
}

export default EmailMeContainer