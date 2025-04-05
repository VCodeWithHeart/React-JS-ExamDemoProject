import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../provider/AuthProvider'
import StudentProfile from '../presentation/StudentProfile'
import useValidate from '../customHooks/useValidate'
import studentData from '../data/studentData'
import Loader from '../presentation/Loader'
import { enqueueSnackbar } from 'notistack'
import ProfileContainer from './ProfileContainer'

const StudentProfileContainer = () => {
    const { token } = useAuth()
    const [studentDetails, setStudentDetails] = useState('')

    const { error, validateInputs, checkValidations } = useValidate(studentDetails)

    const [response, setResponse] = useState()

    const handleChange = (e) => {
        const { name, value, type } = e.target
        validateInputs(name, value, type)

        setStudentDetails((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const getStudentProfile = async () => {
        const data = await axios.get('https://examination.onrender.com/student/getStudentDetail', {
            headers: {
                'access-token': token
            }
        })

        console.log("response", data)
        setResponse(data)
    }

    const editStudentProfile = async () => {
        const res = await axios.put('https://examination.onrender.com/student/studentProfile', studentDetails, {
            headers: {
                'access-token': token
            }
        })

        console.log("response data", res)
        if (res?.data?.statusCode === 200) {
            enqueueSnackbar(res?.data?.message, { variant: 'success' })
            setResponse('')
            getStudentProfile()
            setStudentDetails('')
        }
        else if (res?.data?.statusCode === 500) {
            enqueueSnackbar(res?.data?.message, { variant: 'info' })
        }
        else {
            enqueueSnackbar(res?.data?.message, { variant: 'error' })
        }
    }

    const handleEdit = () => {
        checkValidations(studentData)

        const errorStatus = Object.values(error).some((cur) => cur.status === true)
        console.log("errorStatus", errorStatus)
        console.log("error", error);

        if (!errorStatus) {
            editStudentProfile()
        }
    }

    useEffect(() => {
        getStudentProfile()
    }, [])

    return (
        <>
            {
                response ? (
                    <>
                        <StudentProfile
                            response={response}
                            studentDetails={studentDetails}
                            handleChange={handleChange}
                            error={error}
                            handleEdit={handleEdit}
                        />

                        {/* <ProfileContainer
                            handlePassword={handlePassword}
                            handleChange={handleChange}
                            passwordDetails={passwordDetails}
                            error={error}
                        /> */}
                    </>
                ) : (
                    <>
                        <Loader />
                    </>
                )
            }
        </>
    )
}

export default StudentProfileContainer