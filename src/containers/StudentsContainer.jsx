import axios from 'axios'
import { enqueueSnackbar } from 'notistack'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../provider/AuthProvider'
import Students from '../presentation/Students'
import Loader from '../presentation/Loader'

const StudentsContainer = () => {
    // const { token } = useAuth()
    const [studentsData, setStudentsData] = useState('')
    const token = localStorage.getItem('token')
    const [loading, setLoading] = useState(true)

    const getAllStudentsData = async () => {
        try {
            const response = await axios.get('https://examination.onrender.com/dashboard/Teachers', {
                headers: {
                    'access-token': token
                }
            })

            if (response) {
                setLoading(false)
            }

            if (response?.data?.statusCode === 200) {
                enqueueSnackbar(response?.data?.message, { variant: 'success' })
                // tokenSetter(response?.data?.data?.token)
                // localStorage.setItem("role", `${response?.data?.data?.role}`)
                // role === "student" ? navigate('/student/dashboard') : navigate('/teacher/dashboard')
            }
            else if (response?.data?.statusCode === 500) {
                enqueueSnackbar(response?.data?.message, { variant: 'info' })
            }
            else {
                enqueueSnackbar(response?.data?.message, { variant: 'error' })

            }

            setStudentsData(() => response?.data?.data)
            console.log("response", response);
        }
        catch (error) {
            console.log("error", error);
        }
    }

    useEffect(() => {
        getAllStudentsData()
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
                            <Students studentsData={studentsData} />
                        </>
                    )
            }
        </>
    )
}

export default StudentsContainer

// {
//     studentsData ? (
//         <>
//             <Students studentsData={studentsData} />
//         </>
//     ) :
//         (
//             <>
//                 <Loader />
//             </>
//         )
// }