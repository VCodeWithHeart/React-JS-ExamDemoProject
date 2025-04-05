import React from 'react'
import { Button } from '@mui/material'
import { Link } from 'react-router-dom'
import EditNoteIcon from '@mui/icons-material/EditNote';
import MenuBookIcon from '@mui/icons-material/MenuBook';

const StudentDashboard = ({ exams, handleExamNotes }) => {

    console.log("exams", exams);

    return (
        <>
            <h1 style={{ textAlign: "center", fontFamily: "sans-serif" }}>Student Dashboard</h1>
            <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
                {
                    exams && exams?.map(({ email, subjectName, notes, _id, Result }) => (
                        <div key={_id}>
                            <div style={{ backgroundColor: "dodgerblue", color: "white", padding: "25px", margin: "15px", display: "flex", justifyContent: "space-between", borderRadius: "10px" }}>

                                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                        <MenuBookIcon sx={{ fontSize: "45px" }} />
                                        <h3>{subjectName}</h3>
                                    </div>
                                    <div>
                                        <span style={{ fontFamily: "monospace", fontStyle: "italic", backgroundColor: "white", color: "dodgerblue", padding: "5px", borderRadius: "5px" }}>created by: {email}</span>
                                    </div>

                                    <div>
                                        {notes.join(" ")}
                                    </div>
                                </div>

                                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                                    <Button disabled={Result.length && true} variant="outlined" sx={{ borderRadius: "10px", backgroundColor: "white", textDecoration: "none", width: "165px" }} onClick={() => handleExamNotes(notes)}
                                        startIcon={<EditNoteIcon style={{ fontSize: "35px" }} />}>
                                        <Link to={`giveexam/${_id}`} style={{ textDecoration: "none", color: `${Result.length ? "lightgrey" : "dodgerblue"}` }}>
                                            {Result.length ? "Submitted" : "Start Exam"}
                                        </Link>
                                    </Button>
                                    {
                                        Result.length ? Result.map(({ score, rank, resultStatus }, i) => (
                                            <div style={{ backgroundColor: "white", color: "dodgerblue", padding: "5px", borderRadius: "10px", textTransform: "capitalize", fontWeight: "bolder" }} key={i}>
                                                <p>status: {resultStatus}</p>
                                                <p>score: <span style={{ color: "gold" }}>{score}</span></p>
                                                <p>rank: <span style={{ color: "gold" }}>{rank}</span></p>
                                            </div>
                                        )) : <span style={{ textAlign: "center" }}>Exam Pending</span>
                                    }
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default StudentDashboard

// {
//     Result.length ? Result.map(({ score, rank, resultStatus }) => (
//         <div>
//             <p>resultStatus: {resultStatus}</p>
//             <p>{score}</p>
//             <p>{rank}</p>
//         </div>
//     )) : ""
// }


{/* <div>
<span>{notes}</span>
</div> */}