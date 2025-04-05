import React, { useEffect, useState } from 'react'
import PreLoader from '../presentation/PreLoader'
import axios from 'axios'
import { enqueueSnackbar } from 'notistack'
import { useAuth } from '../provider/AuthProvider'
import StudentDashboard from '../presentation/StudentDashboard'
import { Outlet, useLocation } from 'react-router-dom'

const StudentDashboardContainer = ({ handleExamNotes }) => {
    const [exams, setExams] = useState('')
    const { token } = useAuth()
    const [loading, setLoading] = useState(false)
    const { pathname } = useLocation()

    const fetchExams = async () => {
        setLoading(true)
        try {
            const response = await axios.get('https://examination.onrender.com/student/studentExam', {
                headers: {
                    'access-token': token
                }
            })

            if (response.status === 200) {
                enqueueSnackbar(response?.data?.message, { variant: 'success' })
            }
            else {
                enqueueSnackbar(response?.data?.message, { variant: 'error' })
            }
            console.log("response", response);
            setExams(response?.data?.data)

        } catch (error) {
            console.log("error", error);
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchExams()
    }, [])

    return (
        <>
            {
                loading ? (
                    <>
                        <PreLoader />
                    </>
                ) : (
                    <>
                        {
                            pathname === "/student/dashboard" ? <StudentDashboard {...{ exams, handleExamNotes }} /> : <Outlet />
                        }
                    </>
                )
            }
        </>
    )
}

export default StudentDashboardContainer