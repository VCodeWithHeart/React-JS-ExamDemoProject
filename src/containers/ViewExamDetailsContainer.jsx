import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../provider/AuthProvider'
import { enqueueSnackbar } from 'notistack'
import PreLoader from '../presentation/PreLoader'
import CreateExams from '../presentation/CreateExams'

const ViewExamDetailsContainer = () => {
    const { token } = useAuth()
    const params = useParams()
    const { id } = params
    const [loading, setLoading] = useState(false)
    const [response, setResponse] = useState()
    const [currentQuestion, setCurrentQuestion] = useState()
    const [currentQueIndex, setCurrentQueIndex] = useState(0)
    const createMode = false
    // const editMode = false

    const fetchExamDetail = async () => {
        setLoading(true)
        try {
            const res = await axios.get(`https://examination.onrender.com/dashboard/Teachers/examDetail?id=${id}`, {
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
            setResponse(res?.data?.data?.questions)
            setCurrentQuestion(res?.data?.data?.questions[currentQueIndex])
        } catch (error) {
            console.log("error", error);
        }
        setLoading(false)
    }

    const handleNextBtn = (e) => {
        e.preventDefault();
        if (currentQueIndex < response.length - 1) {
            setCurrentQueIndex((prev) => prev + 1)
        }
    }

    const handlePrevBtn = (e) => {
        e.preventDefault();
        if (currentQueIndex > 0) {
            setCurrentQueIndex((prev) => prev - 1)
        }
    }

    useEffect(() => {
        if (response) {
            setCurrentQuestion(response[currentQueIndex])
        }
    }, [handleNextBtn, handlePrevBtn])

    useEffect(() => {
        fetchExamDetail()
    }, [])

    console.log("response", response);

    return (
        <>
            {
                loading && !currentQuestion ? (
                    <>
                        <PreLoader />
                    </>
                ) : (
                    <>
                        <CreateExams {...{ createMode, handleNextBtn, handlePrevBtn, currentQueIndex, currentQuestion }} />
                    </>
                )
            }
        </>
    )
}

export default ViewExamDetailsContainer