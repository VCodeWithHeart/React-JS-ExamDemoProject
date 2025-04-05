import { Textarea } from '@mui/joy'
import { FormControlLabel, Radio, RadioGroup, TextField } from '@mui/material'
import React from 'react'

const CreateExams = ({ handleInputChange, currentQuestion, handlePrevBtn, handleNextBtn, handleSubjectChange, currentQueIndex, handleNotesChange, questions, handleAnswer, createMode, subjectName }) => {
    console.log("currentQuestion", currentQuestion);
    console.log("currentQueIndex", currentQueIndex);
    console.log("createMode", createMode);
    console.log("subjectName", subjectName);
    return (
        <>

            {
                createMode ? <h1 style={{ textAlign: "center" }}>Please Fill This Form To Create Exam</h1> : <h1 style={{ textAlign: "center" }}>Exam Questions</h1>
            }


            <div style={{ padding: "15px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <form style={{ width: "70%", display: "flex", flexDirection: "column", maxWidth: "700px", gap: "1rem", padding: "30px", border: "1px solid grey" }}>
                    {
                        createMode && (
                            <TextField name='subjectName' sx={{ width: "100%" }} label={"Subject name"}
                                onChange={(e) => handleSubjectChange(e)} value={subjectName}
                                helperText=" "
                            />
                        )
                    }

                    {
                        <div className='quesDiv' style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                            <TextField name='question'
                                value={currentQuestion?.question}
                                label={`Enter your question ${currentQueIndex + 1}`}
                                onChange={(e) => createMode && handleInputChange(e, "question", currentQueIndex)}
                                helperText=' '
                            />
                            <div className='optionsDiv' style={{ display: "flex", flexDirection: "column" }}>
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    name="radio-buttons-group"
                                >
                                    {
                                        currentQuestion?.options?.map((option, optionIndex) => (
                                            <div style={{ display: "flex" }} key={optionIndex}>
                                                <FormControlLabel value={currentQuestion?.options[optionIndex]}
                                                    control={<Radio />}
                                                    checked={
                                                        (currentQuestion?.options[optionIndex] && currentQuestion?.answer) &&
                                                            currentQuestion?.options[optionIndex] === currentQuestion?.answer ? true : false
                                                    }
                                                    onChange={createMode && handleAnswer}
                                                    key={optionIndex} />
                                                <TextField
                                                    id="filled-basic" variant="filled"
                                                    name={`option-${optionIndex}`}
                                                    value={currentQuestion?.options[optionIndex]}
                                                    onChange={(e) => createMode && handleInputChange(e, "options", currentQueIndex, optionIndex)}
                                                    label={`Enter your option ${optionIndex + 1}`}
                                                    helperText=' '
                                                />
                                            </div>
                                        ))
                                    }
                                </RadioGroup>
                            </div>
                        </div>
                    }

                    {
                        createMode && (
                            <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                                <span>Notes</span>
                                <Textarea minRows={2} onChange={createMode && handleNotesChange} name='notes' />
                            </div>
                        )
                    }

                    <div style={{ display: "flex", width: "100%", justifyContent: "space-between", marginTop: "10px" }}>
                        <button style={{ padding: "5px", width: "60px" }} onClick={(e) => handlePrevBtn(e)}>Prev</button>
                        <button style={{ padding: "5px", width: "60px" }} onClick={(e) => handleNextBtn(e)}>{createMode && currentQueIndex < questions?.length - 1 ? "Next" : "Submit"}</button>
                    </div>

                </form>
            </div>
        </>
    )
}

export default CreateExams

{/* <TextField key={optionIndex}
    name={`option${optionIndex + 1}`}
    label={`Enter your option ${optionIndex + 1}`}
    value={currentQuestion.options[optionIndex]}
    onChange={(e) => handleInputChange(e, "options", currentQueIndex, optionIndex)}
    error={""}
    helperText={" "}
/> */}


{/* <div>
<div>
    <label htmlFor='subjectName'>SubjectName:</label>
    <TextField value={subjectName} onChange={(e) => handleSubjectChange(e)} />
</div>

<div>
    <label htmlFor='question'>Enter question:</label>
    <TextField value={currentQuestion.question} onChange={(e) => handleInputChange(e, 'question', currentQueIndex)} />
</div>

<div>
    <label htmlFor='answer'>Enter answer:</label>
    <TextField value={currentQuestion.answer} onChange={(e) => handleInputChange(e, 'answer', currentQueIndex)} />
</div>

<div>
    {
        currentQuestion.options.map((option, optionIndex) => (
            <Fragment key={optionIndex}>
                <label>Enter Option {optionIndex + 1}</label>
                <TextField value={currentQuestion.options[optionIndex]} onChange={(e) => handleInputChange(e, 'options', currentQueIndex, optionIndex)} />
            </Fragment>
        ))
    }
</div>
</div> */}



// import React, { Fragment } from 'react'
// import examsQuestionStructure from '../data/examsQuestionStructure'
// import { FormControlLabel, Radio, RadioGroup, TextField } from '@mui/material'
// import Textarea from '@mui/joy/Textarea';

// const CreateExams = ({ handleChange, handleNext, handlePrev, step }) => {
//     // const { subjectName, questions, notes } = examsQuestionStructure
//     const questionsToShow = [
//         {
//             "question": "question1",
//             "answer": "ans1",
//             "options": [
//                 "ans1",
//                 "ans2",
//                 "ans3",
//                 "ans4"
//             ]
//         },
//         {
//             "question": "question2",
//             "answer": "ans2",
//             "options": [
//                 "ans1",
//                 "ans2",
//                 "ans3",
//                 "ans4"
//             ]
//         },
//         {
//             "question": "question3",
//             "answer": "ans3",
//             "options": [
//                 "ans1",
//                 "ans2",
//                 "ans3",
//                 "ans4"
//             ]
//         },
//         {
//             "question": "question4",
//             "answer": "ans4",
//             "options": [
//                 "ans1",
//                 "ans2",
//                 "ans3",
//                 "ans4"
//             ]
//         },
//         {
//             "question": "question5",
//             "answer": "ans1",
//             "options": [
//                 "ans1",
//                 "ans2",
//                 "ans3",
//                 "ans4"
//             ]
//         },
//         {
//             "question": "question6",
//             "answer": "ans2",
//             "options": [
//                 "ans1",
//                 "ans2",
//                 "ans3",
//                 "ans4"
//             ]
//         },
//         {
//             "question": "question7",
//             "answer": "ans3",
//             "options": [
//                 "ans1",
//                 "ans2",
//                 "ans3",
//                 "ans4"
//             ]
//         },
//         {
//             "question": "question8",
//             "answer": "ans4",
//             "options": [
//                 "ans1",
//                 "ans2",
//                 "ans3",
//                 "ans4"
//             ]
//         },
//         {
//             "question": "question9",
//             "answer": "ans1",
//             "options": [
//                 "ans1",
//                 "ans2",
//                 "ans3",
//                 "ans4"
//             ]
//         },
//         {
//             "question": "question10",
//             "answer": "ans2",
//             "options": [
//                 "ans1",
//                 "ans2",
//                 "ans3",
//                 "ans4"
//             ]
//         }, {
//             "question": "question11",
//             "answer": "ans3",
//             "options": [
//                 "ans1",
//                 "ans2",
//                 "ans3",
//                 "ans4"
//             ]
//         }, {
//             "question": "question12",
//             "answer": "ans4",
//             "options": [
//                 "ans1",
//                 "ans2",
//                 "ans3",
//                 "ans4"
//             ]
//         },
//         {
//             "question": "question13",
//             "answer": "ans1",
//             "options": [
//                 "ans1",
//                 "ans2",
//                 "ans3",
//                 "ans4"
//             ]
//         },
//         {
//             "question": "question14",
//             "answer": "ans2",
//             "options": [
//                 "ans1",
//                 "ans2",
//                 "ans3",
//                 "ans4"
//             ]
//         },
//         {
//             "question": "question15",
//             "answer": "ans3",
//             "options": [
//                 "ans1",
//                 "ans2",
//                 "ans3",
//                 "ans4"
//             ]
//         }
//     ]

//     console.log("questionsTOShow", questionsToShow);

//     console.log("step", step);

//     return (
//         <>
//             <div style={{ padding: "15px", display: "flex", flexDirection: "column", alignItems: "center" }}>
//                 <form style={{ width: "500px", display: "flex", flexDirection: "column", gap: "1rem" }}>
//                     <TextField name='subjectName' sx={{ width: "100%" }} label={"SubjectName"} onChange={handleChange} />

//                     {
//                         Object.values(questionsToShow)?.map((cur, i) => {

//                             if (step === i + 1) {
//                                 return <Fragment key={i}>
//                                     <div className='quesDiv' style={{ display: "flex", flexDirection: "column", gap: "1rem" }} key={i}>
//                                         <TextField name='question' label={`Enter your question ${step}`} onChange={handleChange} />
//                                         <div className='ansDiv'>
//                                             <TextField name='answer' label={`Answer for question ${step}`} onChange={handleChange} />
//                                         </div>
//                                         <div className='optionsDiv'>
//                                             {
//                                                 cur?.options?.map((cur, i) => (
//                                                     <TextField key={i} name={`option${i + 1}`} label={`Enter your option ${i + 1}`} onChange={handleChange} />
//                                                 ))
//                                             }
//                                         </div>
//                                     </div>
//                                 </Fragment>
//                             }
//                         })
//                     }
//                     <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
//                         <span>Notes</span>
//                         <Textarea minRows={2} onChange={handleChange} name='notes' />
//                     </div>

//                     <div style={{ display: "flex", width: "100%", justifyContent: "space-between", marginTop: "10px" }}>
//                         <button style={{ padding: "5px", width: "60px" }} onClick={(e) => handlePrev(e)}>Prev</button>
//                         <button style={{ padding: "5px", width: "60px" }} onClick={(e) => handleNext(e)}>{step < 15 ? "Next" : "Submit"}</button>
//                     </div>
//                 </form>
//             </div>
//         </>
//     )
// }

// export default CreateExams




import { Textarea } from '@mui/joy'
import { FormControlLabel, Radio, RadioGroup, TextField } from '@mui/material'
import React from 'react'

const CreateExams = ({ handleInputChange, currentQuestion, handlePrevBtn, handleNextBtn, handleSubjectChange, currentQueIndex, handleNotesChange, questions, handleAnswer, createMode, subjectName, testValidations, editMode, handleEditBtn, reviewing }) => {
    
    return (
        <>
            {
                createMode ? <h1 style={{ textAlign: "center" }}>Please Fill This Form To {editMode ? "Edit" : "Create"} Exam</h1> : <h1 style={{ textAlign: "center" }}>Exam Questions</h1>
            }

            <div style={{ padding: "15px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <form style={{ width: "70%", display: "flex", flexDirection: "column", maxWidth: "700px", gap: "1rem", padding: "30px", border: "1px solid grey" }}>

                    {
                        (createMode && !editMode) ? (
                            <TextField name='subjectName' sx={{ width: "100%" }} label={"Subject name"}
                                onChange={(e) => createMode && handleSubjectChange(e)}
                                value={subjectName || ""}
                                // value={currentQuestion}
                                error={testValidations?.subjectName?.status}
                                helperText={testValidations?.subjectName?.status && testValidations?.subjectName?.msg}
                            />
                        ) : ""
                    }

                    {
                        <div className='quesDiv' style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                            <TextField name='question'
                                value={currentQuestion?.question}
                                label={`Enter your question ${currentQueIndex + 1}`}
                                onChange={(e) => createMode && handleInputChange(e, "question", currentQueIndex)}
                                error={testValidations?.question?.status || testValidations?.sameQuestions?.status}
                                helperText={testValidations?.question?.status ? testValidations?.question?.msg : testValidations?.sameQuestions?.status ? testValidations?.sameQuestions?.msg : ""}
                            />
                            <div className='optionsDiv' style={{ display: "flex", flexDirection: "column" }}>
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    name="radio-buttons-group"
                                >
                                    {
                                        currentQuestion?.options?.map((option, optionIndex) => (
                                            <div style={{ display: "flex" }} key={optionIndex}>
                                                <FormControlLabel value={currentQuestion?.options[optionIndex]}
                                                    control={<Radio />}
                                                    checked={
                                                        (currentQuestion?.options[optionIndex] && currentQuestion?.answer) &&
                                                            currentQuestion?.options[optionIndex] === currentQuestion?.answer ? true : false
                                                    }
                                                    onChange={createMode && handleAnswer}
                                                    key={optionIndex} />
                                                <TextField
                                                    id="filled-basic" variant="filled"
                                                    name={`option-${optionIndex}`}
                                                    value={currentQuestion?.options[optionIndex]}
                                                    onChange={(e) => createMode && handleInputChange(e, "options", currentQueIndex, optionIndex)}
                                                    label={`Enter your option ${optionIndex + 1}`}
                                                    error={testValidations[`option-${optionIndex}`]?.status}
                                                    helperText={testValidations[`option-${optionIndex}`]?.status ? testValidations[`option-${optionIndex}`]?.msg : " "}
                                                />
                                            </div>
                                        ))
                                    }
                                </RadioGroup>

                                <span style={{ fontSize: "12px", color: "#d32f2f" }}>{testValidations?.answer?.status ? testValidations?.answer?.msg : ""}</span>
                            </div>
                        </div>
                    }


                    <span style={{ fontSize: "12px", color: "#d32f2f" }}>{testValidations?.fields?.status ? testValidations?.fields?.msg : ""}</span>

                    <span style={{ fontSize: "12px", color: "#d32f2f" }}>{testValidations?.sameOptions?.status ? testValidations?.sameOptions?.msg : ""}</span>

                    {
                        createMode && !editMode ? (
                            <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                                <span>Notes</span>
                                <Textarea minRows={2} onChange={(e) => createMode && handleNotesChange(e)} name='notes'
                                    error={testValidations?.notes?.status}
                                />
                                <span style={{ fontSize: "12px", color: "#d32f2f" }}>{testValidations?.notes?.status ? testValidations?.notes?.msg : " "}</span>
                            </div>
                        ) : ""
                    }

                    <div style={{ display: "flex", width: "100%", justifyContent: "space-between", marginTop: "10px" }}>
                        <button style={{ padding: "5px", width: "60px" }} onClick={(e) => handlePrevBtn(e)}>Prev</button>
                        {
                            reviewing && (<button style={{ padding: "10px", width: "150px", backgroundColor: editMode ? "lightgreen" : "" }} onClick={(e) => handleEditBtn(e)}>{editMode ? "EditMode is ON" : "Edit Mode is OFF"}</button>)
                        }
                        <button style={{ padding: "5px", width: "60px" }} onClick={(e) => handleNextBtn(e)}>{createMode && currentQueIndex < questions?.length - 1 ? "Next" : "Submit"}</button>
                    </div>

                </form>
            </div>
        </>
    )
}

export default CreateExams

{/* <TextField key={optionIndex}
    name={`option${optionIndex + 1}`}
    label={`Enter your option ${optionIndex + 1}`}
    value={currentQuestion.options[optionIndex]}
    onChange={(e) => handleInputChange(e, "options", currentQueIndex, optionIndex)}
    error={""}
    helperText={" "}
/> */}


{/* <div>
<div>
    <label htmlFor='subjectName'>SubjectName:</label>
    <TextField value={subjectName} onChange={(e) => handleSubjectChange(e)} />
</div>

<div>
    <label htmlFor='question'>Enter question:</label>
    <TextField value={currentQuestion.question} onChange={(e) => handleInputChange(e, 'question', currentQueIndex)} />
</div>

<div>
    <label htmlFor='answer'>Enter answer:</label>
    <TextField value={currentQuestion.answer} onChange={(e) => handleInputChange(e, 'answer', currentQueIndex)} />
</div>

<div>
    {
        currentQuestion.options.map((option, optionIndex) => (
            <Fragment key={optionIndex}>
                <label>Enter Option {optionIndex + 1}</label>
                <TextField value={currentQuestion.options[optionIndex]} onChange={(e) => handleInputChange(e, 'options', currentQueIndex, optionIndex)} />
            </Fragment>
        ))
    }
</div>
</div> */}



// import React, { Fragment } from 'react'
// import examsQuestionStructure from '../data/examsQuestionStructure'
// import { FormControlLabel, Radio, RadioGroup, TextField } from '@mui/material'
// import Textarea from '@mui/joy/Textarea';

// const CreateExams = ({ handleChange, handleNext, handlePrev, step }) => {
//     // const { subjectName, questions, notes } = examsQuestionStructure
//     const questionsToShow = [
//         {
//             "question": "question1",
//             "answer": "ans1",
//             "options": [
//                 "ans1",
//                 "ans2",
//                 "ans3",
//                 "ans4"
//             ]
//         },
//         {
//             "question": "question2",
//             "answer": "ans2",
//             "options": [
//                 "ans1",
//                 "ans2",
//                 "ans3",
//                 "ans4"
//             ]
//         },
//         {
//             "question": "question3",
//             "answer": "ans3",
//             "options": [
//                 "ans1",
//                 "ans2",
//                 "ans3",
//                 "ans4"
//             ]
//         },
//         {
//             "question": "question4",
//             "answer": "ans4",
//             "options": [
//                 "ans1",
//                 "ans2",
//                 "ans3",
//                 "ans4"
//             ]
//         },
//         {
//             "question": "question5",
//             "answer": "ans1",
//             "options": [
//                 "ans1",
//                 "ans2",
//                 "ans3",
//                 "ans4"
//             ]
//         },
//         {
//             "question": "question6",
//             "answer": "ans2",
//             "options": [
//                 "ans1",
//                 "ans2",
//                 "ans3",
//                 "ans4"
//             ]
//         },
//         {
//             "question": "question7",
//             "answer": "ans3",
//             "options": [
//                 "ans1",
//                 "ans2",
//                 "ans3",
//                 "ans4"
//             ]
//         },
//         {
//             "question": "question8",
//             "answer": "ans4",
//             "options": [
//                 "ans1",
//                 "ans2",
//                 "ans3",
//                 "ans4"
//             ]
//         },
//         {
//             "question": "question9",
//             "answer": "ans1",
//             "options": [
//                 "ans1",
//                 "ans2",
//                 "ans3",
//                 "ans4"
//             ]
//         },
//         {
//             "question": "question10",
//             "answer": "ans2",
//             "options": [
//                 "ans1",
//                 "ans2",
//                 "ans3",
//                 "ans4"
//             ]
//         }, {
//             "question": "question11",
//             "answer": "ans3",
//             "options": [
//                 "ans1",
//                 "ans2",
//                 "ans3",
//                 "ans4"
//             ]
//         }, {
//             "question": "question12",
//             "answer": "ans4",
//             "options": [
//                 "ans1",
//                 "ans2",
//                 "ans3",
//                 "ans4"
//             ]
//         },
//         {
//             "question": "question13",
//             "answer": "ans1",
//             "options": [
//                 "ans1",
//                 "ans2",
//                 "ans3",
//                 "ans4"
//             ]
//         },
//         {
//             "question": "question14",
//             "answer": "ans2",
//             "options": [
//                 "ans1",
//                 "ans2",
//                 "ans3",
//                 "ans4"
//             ]
//         },
//         {
//             "question": "question15",
//             "answer": "ans3",
//             "options": [
//                 "ans1",
//                 "ans2",
//                 "ans3",
//                 "ans4"
//             ]
//         }
//     ]

//     console.log("questionsTOShow", questionsToShow);

//     console.log("step", step);

//     return (
//         <>
//             <div style={{ padding: "15px", display: "flex", flexDirection: "column", alignItems: "center" }}>
//                 <form style={{ width: "500px", display: "flex", flexDirection: "column", gap: "1rem" }}>
//                     <TextField name='subjectName' sx={{ width: "100%" }} label={"SubjectName"} onChange={handleChange} />

//                     {
//                         Object.values(questionsToShow)?.map((cur, i) => {

//                             if (step === i + 1) {
//                                 return <Fragment key={i}>
//                                     <div className='quesDiv' style={{ display: "flex", flexDirection: "column", gap: "1rem" }} key={i}>
//                                         <TextField name='question' label={`Enter your question ${step}`} onChange={handleChange} />
//                                         <div className='ansDiv'>
//                                             <TextField name='answer' label={`Answer for question ${step}`} onChange={handleChange} />
//                                         </div>
//                                         <div className='optionsDiv'>
//                                             {
//                                                 cur?.options?.map((cur, i) => (
//                                                     <TextField key={i} name={`option${i + 1}`} label={`Enter your option ${i + 1}`} onChange={handleChange} />
//                                                 ))
//                                             }
//                                         </div>
//                                     </div>
//                                 </Fragment>
//                             }
//                         })
//                     }
//                     <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
//                         <span>Notes</span>
//                         <Textarea minRows={2} onChange={handleChange} name='notes' />
//                     </div>

//                     <div style={{ display: "flex", width: "100%", justifyContent: "space-between", marginTop: "10px" }}>
//                         <button style={{ padding: "5px", width: "60px" }} onClick={(e) => handlePrev(e)}>Prev</button>
//                         <button style={{ padding: "5px", width: "60px" }} onClick={(e) => handleNext(e)}>{step < 15 ? "Next" : "Submit"}</button>
//                     </div>
//                 </form>
//             </div>
//         </>
//     )
// }

// export default CreateExams
