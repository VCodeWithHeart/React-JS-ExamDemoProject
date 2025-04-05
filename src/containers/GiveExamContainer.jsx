import React, { useEffect, useState } from 'react'
import GiveExam from '../presentation/GiveExam'
import { enqueueSnackbar } from 'notistack'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../provider/AuthProvider'
import PreLoader from '../presentation/PreLoader'

const GiveExamContainer = ({ notes }) => {
    const params = useParams()
    const { id } = params
    const { token } = useAuth()
    const [test, setTest] = useState()
    const [loading, setLoading] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [answers, setAnswers] = useState([])
    const [error, setError] = useState({})
    const [reviewMode, setReviewMode] = useState(false)
    const [editMode, setEditMode] = useState(true)
    const navigate = useNavigate()

    const getExamPaper = async () => {
        setLoading(true)
        try {
            const response = await axios.get(`https://examination.onrender.com/student/examPaper?id=${id}`, {
                headers: {
                    'access-token': token
                }
            })

            response.status === 200 ? enqueueSnackbar(response?.data?.message, { variant: 'success' })
                : enqueueSnackbar(response?.data?.message, { variant: 'error' })


            setTest(response?.data?.data)
            console.log("response", response)

        } catch (error) {
            console.log("error", error);
        }
        setLoading(false)
    }

    console.log("test", test);

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex((prev) => prev - 1)
        }
    }

    const handleNext = () => {

        if (answers.length < currentIndex + 1) {
            setError({ option: { status: true, msg: "please select atleast one option" } })
        }
        else {
            (currentIndex < test.length - 1) && setCurrentIndex((prev) => prev + 1)

            setError({ option: { status: false, msg: "please select atleast one option" } })
        }
    }

    const handleReviewMode = () => {
        if (answers.length >= currentIndex + 1) {
            setReviewMode(true)
            setEditMode(false)
            setError({ option: { status: false, msg: "please select atleast one option" } })
        }
        else {
            setError({ option: { status: true, msg: "please select atleast one option" } })
        }
    }

    const handleEdit = () => {
        setEditMode((prev) => !prev)
        enqueueSnackbar(`Edit mode is ${!editMode ? "ON" : "OFF"}`, { variant: 'info' })
    }

    console.log("answers", answers);

    const handleAnswers = (e, _id) => {
        const { value } = e.target

        console.log("question id", _id, "value", value);
        const answerObj = { question: _id, answer: value }

        setAnswers((prev) => {
            const existingAnswerIndex = prev.findIndex((a) => a.question === answerObj.question)
            if (existingAnswerIndex !== -1) {
                const updatedAnswers = [...prev]
                updatedAnswers[existingAnswerIndex] = answerObj
                return updatedAnswers
            }
            else {
                return [...prev, answerObj]
            }
        })

        setError({ option: { status: false, msg: "please select atleast one option" } })
    }

    useEffect(() => {
        getExamPaper()
    }, [])

    const handleSubmit = async () => {
        setLoading(true)
        try {
            const response = await axios.post(`https://examination.onrender.com/student/giveExam?id=${id}`, answers, {
                headers: {
                    'access-token': token
                }
            })

            response.status === 200 ? enqueueSnackbar(response?.data?.message, { variant: 'success' })
                : enqueueSnackbar(response?.data?.message, { variant: 'error' })

            console.log("response", response)

            setExamsGiven((prev) => [...prev, id])

        } catch (error) {
            console.log("error", error);
        }
        setLoading(false)

        navigate('/student/dashboard')
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
                        <GiveExam {...{
                            test, handleNext, handlePrev,
                            currentIndex, handleAnswers, error,
                            answers, reviewMode, handleReviewMode,
                            handleEdit, editMode, handleSubmit, notes
                        }} />
                    </>
                )
            }
        </>
    )
}

export default GiveExamContainer

// [...new Set(prev.map((cur) => cur.question))]

// setAnswers(() => [...new Set(answers.map((cur) => cur.question))])

// set checked state for answer and

// if (answers[currentIndex - 1]) {
//     setError({ option: { status: true, msg: "please select atleast one option" } })
// }
// else {
// if (currentIndex < test.length - 1) {
//     setCurrentIndex((prev) => prev + 1)
//     setAnswers((prev) => [...prev, ...currentSelected])
// }
//     // else {
//     //     setAnswers(() => [])
//     // }

//     setError({ option: { status: false, msg: "please select atleast one option" } })
//     setCurrentSelected(() => [])
// }

// const arr = [
//     {que:"60476b2fde1c1300150bd1a2", ans: "ans2"},
//     {que:"60476b2fde1c1300150bd1a2", ans: "ans2"},
//     {que:"60476b2fde1c1300150bd1a3", ans: "ans2"}
// ]

