import React, { useEffect, useState } from 'react'
import { useAuth } from '../provider/AuthProvider'
import axios from 'axios'
import Loader from '../presentation/Loader'
import ExamsCreated from '../presentation/ExamsCreated'
import { enqueueSnackbar } from 'notistack'

const ExamsCreatedContainer = ({ allExamData, setAllExamData }) => {
    const { token } = useAuth()
    const [loading, setLoading] = useState()
    // const [studentDetails, setStudentDetails] = useState('')

    // const { error, validateInputs, checkValidations } = useValidate(studentDetails)

    const [response, setResponse] = useState()

    // const handleChange = (e) => {
    //     const { name, value, type } = e.target
    //     validateInputs(name, value, type)

    //     setStudentDetails((prev) => ({
    //         ...prev,
    //         [name]: value
    //     }))
    // }

    const getExams = async () => {
        setLoading(true)
        try {

            const res = await axios.get('https://examination.onrender.com/dashboard/Teachers/viewExam', {
                headers: {
                    'access-token': token
                }
            })

            if (res.status === 200) {
                enqueueSnackbar(res?.data?.message, { variant: 'success' })
            }
            else {
                enqueueSnackbar(res?.data?.message, { variant: 'error' })
            }
            console.log("response", res)
            setResponse(res)
            setAllExamData(res)
        } catch (error) {
            console.log("error", error);
        }
        setLoading(false)
    }

    const handleDeleteExam = async (_id) => {
        setLoading(true)
        try {

            const res = await axios.delete(`https://examination.onrender.com/dashboard/Teachers/deleteExam?id=${_id}`, {
                headers: {
                    'access-token': token
                }
            })

            if (res.status === 200) {
                enqueueSnackbar(res?.data?.message, { variant: 'success' })
            }
            else {
                enqueueSnackbar(res?.data?.message, { variant: 'error' })
            }
            console.log("response", res)
            setResponse(res)

        } catch (error) {
            console.log("error", error);
        }
        setLoading(false)
        getExams()
    }

    // const editStudentProfile = async () => {
    //     const res = await axios.put('https://examination.onrender.com/student/studentProfile', studentDetails, {
    //         headers: {
    //             'access-token': token
    //         }
    //     })

    //     console.log("response data", res)
    //     if (res?.data?.statusCode === 200) {
    //         enqueueSnackbar(res?.data?.message, { variant: 'success' })
    //         setResponse('')
    //         getStudentProfile()
    //         setStudentDetails('')
    //     }
    //     else if (res?.data?.statusCode === 500) {
    //         enqueueSnackbar(res?.data?.message, { variant: 'info' })
    //     }
    //     else {
    //         enqueueSnackbar(res?.data?.message, { variant: 'error' })
    //     }
    // }

    // const handleEdit = () => {
    //     checkValidations(studentData)

    //     const errorStatus = Object.values(error).some((cur) => cur.status === true)
    //     console.log("errorStatus", errorStatus)
    //     console.log("error", error);

    //     if (!errorStatus) {
    //         editStudentProfile()
    //     }
    // }

    useEffect(() => {
        getExams()
    }, [])

    return (
        <>
            {
                loading ? (
                    <>
                        <Loader />
                    </>
                )
                    : (
                        <ExamsCreated response={response} handleDeleteExam={handleDeleteExam} />
                    )
            }

        </>
    )
}

export default ExamsCreatedContainer