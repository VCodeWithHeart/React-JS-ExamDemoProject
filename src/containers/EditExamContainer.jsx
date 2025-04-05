import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useAuth } from '../provider/AuthProvider'
import { enqueueSnackbar } from 'notistack'
import PreLoader from '../presentation/PreLoader'
import CreateExams from '../presentation/CreateExams'

const EditExamContainer = ({ allExamData }) => {
    const { token } = useAuth()
    const params = useParams()
    const { id } = params
    const [loading, setLoading] = useState(false)
    const [response, setResponse] = useState()
    const [currentQuestion, setCurrentQuestion] = useState()
    const [currentQueIndex, setCurrentQueIndex] = useState(0)
    const [questions, setQuestions] = useState()
    const [createMode, setCreateMode] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const reviewing = true

    const [testValidations, setTestValidations] = useState({})

    const currentExamData = allExamData?.data?.data.filter(({ _id }) => _id === id)
    const { notes, subjectName } = currentExamData

    const handleEditBtn = (e) => {
        e.preventDefault()
        setCreateMode((prev) => !prev)
        setEditMode((prev) => !prev)
    }

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

    const handleInputChange = (event, field, index, optionIndex = null) => {
        const { value, name } = event.target
        const updatedQuestions = [...response]
        if (field === "question") {
            updatedQuestions[index][field] = value
        }
        else if (field === "options" && optionIndex !== null) {
            updatedQuestions[index].options[optionIndex] = value
        }

        console.log("questions", questions);

        setQuestions(updatedQuestions)

        if (!value.trim()) {
            setTestValidations((prev) => ({
                ...prev,
                [name]: { status: true, msg: `${name} field cannot be empty` }
            }))
        }
        else {
            setTestValidations((prev) => ({
                ...prev,
                [name]: { status: false, msg: `${name} field cannot be empty` }
            }))
        }
    }

    const handleAnswer = (e) => {
        const { name } = e.target

        const val = currentQuestion.options.every((val) => val !== "")

        if (val) {
            setTestValidations((prev) => ({
                ...prev,
                [name]: { status: false, msg: "please select atleast one option" },
                answer: { status: false, msg: "please select atleast one option" },
            }))
        }
        else {
            setTestValidations((prev) => ({
                ...prev,
                [name]: { status: true, msg: "please select atleast one option" }
            }))
        }

        questions[currentQueIndex].answer = e.target.value
    }

    console.log("testValidations", testValidations);

    const sendUpdatedQuestions = async (examQuestions) => {
        setLoading(true)
        try {
            const res = await axios.put(`https://examination.onrender.com/dashboard/Teachers/editExam?id=${id}`, examQuestions, {
                headers: {
                    'access-token': token
                }
            })
            console.log("updated res", res)
            if (res.status === 200) {
                enqueueSnackbar(res?.data?.message, { variant: 'success' })
            }
            else {
                enqueueSnackbar(res?.data?.message, { variant: 'error' })
            }
        } catch (error) {
            console.log("error", error);
        }
        setLoading(false)
    }

    console.log("response", response);

    const handleSubmitBtn = () => {
        const examQuestions = {
            subjectName: subjectName,
            questions: questions,
            notes: notes
        }
        console.log("examQuestions", examQuestions);

        sendUpdatedQuestions(examQuestions)
    }

    const handleNextBtn = (e) => {
        e.preventDefault();

        console.log("questions updated", questions);

        // Object.values(currentQueIndex).every((cur) => cur !== "") // agar ek bhi value khali nahi he to true return karega

        // if (Object.keys(testValidations).includes('answer')) {

        //     if (testValidations?.answer?.status) {
        //         setTestValidations((prev) => ({ ...prev, answer: { status: true, msg: "please select atleast one option" } }))
        //     }
        //     else {
        //         setTestValidations((prev) => ({ ...prev, answer: { status: false, msg: "please select atleast one option" } }))
        //     }
        // }
        // else {
        //     setTestValidations((prev) => ({
        //         ...prev,
        //         answer: { status: true, msg: "please select atleast one option" }
        //     }))
        // }

        // function that checks if every field is filled or not
        const allFilled = Object.values(currentQuestion).every((val) => {
            if (Array.isArray(val)) {
                return val.every((subVal) => subVal !== "")
            }
            return val !== ""
        })

        if (allFilled) {
            if (currentQueIndex < response.length - 1) {
                setCurrentQueIndex((prev) => prev + 1)
                //
                setTestValidations({})
            }
            else {
                handleSubmitBtn()
            }

            setTestValidations((prev) => ({
                ...prev,
                fields: { status: false, msg: "please fill all the fields" }
            }))
        }
        else {
            setTestValidations((prev) => ({
                ...prev,
                fields: { status: true, msg: "please fill all the fields" }
            }))
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

    // currentQuestions can be check

    return (
        <>
            {
                loading && !currentQuestion ? (
                    <>
                        <PreLoader />
                    </>
                ) : (
                    <>
                        <CreateExams {...{
                            createMode, handleNextBtn, handlePrevBtn,
                            currentQueIndex, currentQuestion, editMode, handleInputChange,
                            testValidations, handleAnswer, handleEditBtn, reviewing
                        }} />
                    </>
                )
            }
        </>
    )
}

export default EditExamContainer