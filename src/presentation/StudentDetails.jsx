import React, { Fragment } from 'react'
import PersonIcon from '@mui/icons-material/Person';
// import { useParams } from 'react-router-dom';

const StudentDetails = ({ response }) => {
    const student = response?.[0]
    // const { name, email, Result } = student

    return (
        <>
            <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "15px", backgroundColor: "dodgerblue", color: "white", padding: "20px 0px", width: "40%", borderRadius: "20px" }}>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <PersonIcon sx={{ fontSize: "5em", color: "gold" }} />
                        <h2>{student?.name}</h2>
                        <span>{student?.email}</span>
                    </div>
                </div>
            </div>

            <table style={{ width: "90%", backgroundColor: "whitesmoke", margin: "10px auto" }}>
                <thead>
                    <tr style={{ display: "flex", justifyContent: "space-around", backgroundColor: "grey", color: "white", padding: "10px" }}>
                        <th style={{ width: "100px", textAlign: "center" }}>Subject</th>
                        <th style={{ width: "100px", textAlign: "center" }}>Score</th>
                        <th style={{ width: "100px", textAlign: "center" }}>Rank</th>
                    </tr>
                </thead>

                <tbody>
                    {
                        student?.Result?.length && (
                            student?.Result?.map(({ subjectName, score, rank }, i) => (
                                <Fragment>
                                    <tr style={{ display: "flex", justifyContent: "space-around", padding: "10px" }} key={i}>
                                        <td style={{ width: "100px", textAlign: "center" }}>{subjectName}</td>
                                        <td style={{ width: "100px", textAlign: "center" }}>{score}</td>
                                        <td style={{ width: "100px", textAlign: "center" }}>{rank}</td>
                                    </tr>
                                </Fragment>
                            ))
                        )
                    }
                </tbody>
            </table>
        </>
    )
}

export default StudentDetails

{/* <table style={{ width: "100%", display: "flex", flexDirection: "column" }}>
<thead>
    <tr>
        <th>Subject</th>
        <th>Score</th>
        <th>Rank</th>
    </tr>
</thead>

<tbody>
    {
        student?.Result?.length && (
            student?.Result?.map(({ subjectName, score, rank }, i) => (
                <>
                    <tr key={i}>
                        <td>{subjectName}</td>
                        <td>{score}</td>
                        <td>{rank}</td>
                    </tr>
                </>
            ))
        )
    }
</tbody>
</table> */}

// <div style = {{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px", padding: "20px", margin: "10px 0px", backgroundColor: "tomato", borderRadius: "10px" }} key = { i } >
//                                 <h2>{subjectName}</h2>
//                                 <h4>Rank: <span style={{ color: "gold" }}>{rank}<sup>th </sup></span></h4>
//                                 <h4>Score: {score}</h4>
//</div>

{/* <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
    <h2>{student?.subjectName}</h2>
    <h3 style={{ color: "gold", border: "2px solid white", borderRadius: "50px", padding: "10px" }}>Rank</h3>
    <h4>Score</h4>
</div> */}