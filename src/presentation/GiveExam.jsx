import { Textarea } from '@mui/joy';
import { Button, FormControlLabel, Radio, RadioGroup } from '@mui/material'
import React, { Fragment } from 'react'

const GiveExam = ({ test, handleNext, handlePrev, currentIndex, handleAnswers,
    error, answers, reviewMode, handleReviewMode, handleEdit, editMode, handleSubmit, notes }) => {
    const { option } = error

    console.log("notes", notes);

    return (
        <>
            <div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                    {
                        test && (!reviewMode ? [test[currentIndex]] : test).map(({ options, question, _id }, index) => (
                            <div key={_id} style={{ padding: "25px", display: "flex", flexDirection: "column", borderRadius: "10px", gap: "12px", backgroundColor: "#f4f0e8", width: "500px", margin: "15px" }}>
                                <h2 style={{ textAlign: "center", marginBottom: "15px" }}>{`Question ${!reviewMode ? currentIndex + 1 : index + 1}`}</h2>
                                <h2>{question}</h2>
                                <RadioGroup
                                    aria-labelledby="demo-radio-buttons-group-label"
                                    defaultValue="female"
                                    name="radio-buttons-group"
                                >
                                    {
                                        options?.map((curOption, i) => (
                                            <Fragment key={i}>
                                                <FormControlLabel value={curOption}
                                                    control={<Radio />} label={curOption}
                                                    onChange={(e) => editMode && handleAnswers(e, _id)}
                                                    checked={!reviewMode ? answers[currentIndex]?.answer === curOption : answers[index]?.answer === curOption}
                                                />
                                            </Fragment>
                                        ))
                                    }
                                </RadioGroup>

                                <span style={{ color: "red", fontSize: "small" }}>{option?.status && option?.msg}</span>


                                <div>
                                    <Textarea minRows={notes.length} value={notes.map((note) => `${note}\n`).join("")} readOnly />
                                </div>

                                {
                                    !reviewMode && <div style={{ display: "flex", justifyContent: "space-between", marginTop: "15px" }}>
                                        <Button color="secondary" onClick={handlePrev}>Prev</Button>
                                        <Button color="secondary" onClick={currentIndex < test.length - 1 ? handleNext : handleReviewMode}>{currentIndex < test.length - 1 ? "Next" : "Submit and Review"}</Button>
                                    </div>
                                }
                            </div>
                        ))
                    }

                    {
                        reviewMode && (
                            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "15px" }}>
                                <Button color="secondary" onClick={handleEdit}>{editMode ? "Disable" : "Enable"} Edit Mode</Button>
                                <Button color="secondary" onClick={handleSubmit}>Submit</Button>
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default GiveExam