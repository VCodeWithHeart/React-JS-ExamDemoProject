import React, { useState, useEffect } from 'react';
import CreateExams from '../presentation/CreateExams';
import axios from 'axios';
import { useAuth } from '../provider/AuthProvider';
import PreLoader from '../presentation/PreLoader';
import { enqueueSnackbar } from 'notistack';

const CreateExamsContainer = () => {
    const { token } = useAuth();
    const [subjectName, setSubjectName] = useState('');
    const [testValidations, setTestValidations] = useState({});
    const createMode = true;
    const reviewing = false;
    let uniqueOptions = [];
    let currOp = [];
    const [questions, setQuestions] = useState(Array(15).fill(null).map((cur) => {
        return {
            "question": "",
            "answer": "",
            "options": ["", "", "", ""]
        };
    }));
    const [loading, setLoading] = useState(false);
    const [notes, setNotes] = useState([]);
    const [currentQueIndex, setCurrentQueIndex] = useState(0);
    const [storedErrors, setStoredErrors] = useState({}); // प्रत्येक पेज के लिए स्टोर्ड त्रुटियाँ

    const handleInputChange = (event, field, index, optionIndex = null) => {
        const { value, name } = event.target;
        const updatedQuestions = [...questions];

        if (field === "question") {
            updatedQuestions[index][field] = value;
        }
        else if (field === "options" && optionIndex !== null) {
            updatedQuestions[index].options[optionIndex] = value;
        }

        setQuestions(updatedQuestions);

        !value.trim() ? setTestValidations((prev) => ({ ...prev, [name]: { status: true, msg: `${name} field cannot be empty` } })) :
            setTestValidations((prev) => ({ ...prev, [name]: { status: false, msg: `${name} field cannot be empty` } }));

        // options check
        const currentOptions = updatedQuestions[index]?.options;
        uniqueOptions = [...new Set(currentOptions.map((option) => option.trim()))].filter((option) => option !== ""); // unique options
        currOp = currentOptions.filter((option) => option !== ""); // normal options

        uniqueOptions.length < currOp.length ? setTestValidations((prev) => ({ ...prev, sameOptions: { status: true, msg: "options cannot be same" } }))
            : setTestValidations((prev) => ({ ...prev, sameOptions: { status: false, msg: "options cannot be same" } }));

        // questions check
        const allQuestions = Object.values(questions).map(({ question }) => question.trim()).filter((option) => option !== "");
        const uniqueQuestions = [...new Set(allQuestions)];

        (uniqueQuestions.length < allQuestions.length) ?
            setTestValidations((prev) => ({ ...prev, sameQuestions: { status: true, msg: "questions cannot be same" } }))
            : setTestValidations((prev) => ({ ...prev, sameQuestions: { status: false, msg: "questions cannot be same" } }));
    };

    const handleSubjectChange = (event) => {
        const { name, value } = event.target;
        setSubjectName(value);

        !value.trim() ? setTestValidations((prev) => ({ ...prev, [name]: { status: true, msg: `${name} field cannot be empty` } })) :
            setTestValidations((prev) => ({ ...prev, [name]: { status: false, msg: `${name} field cannot be empty` } }));
    };

    const handleNotesChange = (e) => {
        const { name, value } = e.target;
        setNotes([value]);

        !value.trim() ? setTestValidations((prev) => ({ ...prev, [name]: { status: true, msg: `${name} field cannot be empty` } })) :
            setTestValidations((prev) => ({ ...prev, [name]: { status: false, msg: `${name} field cannot be empty` } }));
    };

    const sendQuestions = async (data) => {
        setLoading(true);
        try {
            const res = await axios.post('https://examination.onrender.com/dashboard/Teachers/Exam', data, {
                headers: {
                    'access-token': token
                }
            });

            res.status === 200 ? enqueueSnackbar(res?.data?.message, { variant: 'success' }) : enqueueSnackbar(res?.data?.message, { variant: 'error' });

        } catch (error) {
            console.log("error", error);
        }
        setLoading(false);
    };

    const handleNextBtn = (e) => {
        e.preventDefault();

        // Answer की त्रुटि जाँच
        if (!questions[currentQueIndex]?.answer) {
            setTestValidations((prev) => ({ ...prev, answer: { status: true, msg: "Please select at least one option" } }));
        } else if (testValidations?.answer?.status) {
            setTestValidations((prev) => ({ ...prev, answer: { status: false, msg: "Please select at least one option" } }));
        }

        const allFilled = Object.values(currentQuestion).every((val) => {
            if (Array.isArray(val)) {
                return val.every((subVal) => subVal !== "")
            }
            return val !== ""
        });

        const hasErrors = Object.keys(testValidations).some((cur) => testValidations[cur]?.status);

        if (allFilled) {
            if (!hasErrors) {
                if (currentQueIndex < questions.length - 1) {
                    // अगले पेज पर जाने से पहले वर्तमान पेज की त्रुटियों को साफ़ करें
                    setStoredErrors(prevStoredErrors => {
                        const newState = { ...prevStoredErrors };
                        delete newState[currentQueIndex];
                        return newState;
                    });
                    setCurrentQueIndex((prev) => prev + 1);
                }
                else {
                    handleSubmitBtn();
                }
            } else {
                // यदि त्रुटियाँ हैं, तो उन्हें स्टोर करें
                const currentErrors = Object.fromEntries(Object.entries(testValidations).filter(([k, v]) => v.status));
                setStoredErrors(prevStoredErrors => ({
                    ...prevStoredErrors,
                    [currentQueIndex]: currentErrors
                }));
                enqueueSnackbar("कृपया वर्तमान प्रश्न में त्रुटियों को ठीक करें!", { variant: 'warning' });
            }

            setTestValidations((prev) => ({
                ...prev,
                fields: { status: false, msg: "please fill all the fields" }
            }));
        }
        else {
            setTestValidations((prev) => ({
                ...prev,
                fields: { status: true, msg: "please fill all the fields" }
            }));
            // यदि फ़ील्ड खाली हैं, तो त्रुटियों को स्टोर करें
            const currentErrors = Object.fromEntries(Object.entries(testValidations).filter(([k, v]) => v.status));
            setStoredErrors(prevStoredErrors => ({
                ...prevStoredErrors,
                [currentQueIndex]: currentErrors
            }));
        }
    };

    const handlePrevBtn = (e) => {
        e.preventDefault();

        // वर्तमान पेज की त्रुटियों को स्टोर करें
        const currentErrors = Object.fromEntries(Object.entries(testValidations).filter(([k, v]) => v.status));
        setStoredErrors(prevStoredErrors => ({
            ...prevStoredErrors,
            [currentQueIndex]: currentErrors
        }));

        if (currentQueIndex > 0) {
            setCurrentQueIndex((prev) => prev - 1);
            setTestValidations({}); // पीछे जाते समय वैलिडेशन को साफ़ करें
        }
    };

    const handleSubmitBtn = () => {
        const examQuestions = {
            subjectName: subjectName,
            questions: questions,
            notes: notes
        };
        sendQuestions(examQuestions);
    };

    const handleAnswer = (e) => {
        const { name, value } = e.target;

        const val = currentQuestion.options.every((val) => val !== "");

        if (val) {
            setTestValidations((prev) => ({
                ...prev,
                [name]: { status: false, msg: "please select atleast one option" },
                answer: { status: false, msg: "please select atleast one option" },
            }));
        }
        else {
            setTestValidations((prev) => ({
                ...prev,
                [name]: { status: true, msg: "please select atleast one option" }
            }));
        }

        questions[currentQueIndex].answer = e.target.value;
    };

    const currentQuestion = questions[currentQueIndex];

    // जब currentQueIndex बदलता है, तो स्टोर्ड त्रुटियों को लोड करें
    useEffect(() => {
        if (storedErrors[currentQueIndex]) {
            setTestValidations(storedErrors[currentQueIndex]);
        } else {
            // यदि इस पेज के लिए कोई स्टोर्ड त्रुटि नहीं है, तो वैलिडेशन को रीसेट करें (आप इसे हटा सकते हैं यदि आप चाहते हैं कि पहले से भरी हुई वैल्यूज़ पर त्रुटियाँ दिखें)
            // setTestValidations({});
        }
    }, [currentQueIndex, storedErrors]);

    return (
        <>
            {
                loading ? (
                    <>
                        <PreLoader />
                    </>
                ) : (
                    <>
                        <CreateExams
                            {...{
                                handleInputChange, currentQuestion,
                                handlePrevBtn, handleNextBtn,
                                handleSubjectChange, currentQueIndex,
                                handleNotesChange, questions, subjectName,
                                handleAnswer, createMode, testValidations,
                                reviewing
                            }}
                        />
                    </>
                )
            }
        </>
    );
};

export default CreateExamsContainer;