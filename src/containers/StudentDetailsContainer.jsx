import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import StudentDetails from '../presentation/StudentDetails'
import axios from 'axios'
import { useAuth } from '../provider/AuthProvider'
import Loader from '../presentation/Loader'

const StudentDetailsContainer = () => {
    const [loading, setLoading] = useState(false)
    const [response, setResponse] = useState()
    const { token } = useAuth()
    const params = useParams()
    const { id } = params

    const fetchStudentDetails = async () => {
        setLoading(true)
        try {
            const res = await axios.get(`https://examination.onrender.com/dashboard/Teachers/viewStudentDetail?id=${id}`, {
                headers: {
                    'access-token': token
                }
            })

            console.log("res", res?.data?.data)
            setResponse(res?.data?.data)

        } catch (error) {
            console.log("error", error)
        }

        setLoading(false)
    }

    useEffect(() => {
        fetchStudentDetails()
    }, [])

    return (
        <>
            {
                loading ? (
                    <>
                        <Loader />
                    </>
                ) :
                    (
                        <>
                            <StudentDetails
                                response={response}
                            />
                        </>
                    )
            }
        </>
    )
}

export default StudentDetailsContainer