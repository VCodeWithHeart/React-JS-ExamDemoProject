import Button from '@mui/material/Button';
import React from 'react'
import { Link } from 'react-router-dom';

const ExamsCreated = ({ response, handleDeleteExam }) => {
    // will check the length of the exams list then show else not
    console.log("response", response);

    return (
        <>
            <div style={{ padding: "15px" }}>
                <div style={{ textAlign: "center" }}>Exams Created</div>
                {
                    response ? (

                        <table style={{ width: "90%", backgroundColor: "whitesmoke", margin: "10px auto" }}>
                            <thead>
                                <tr style={{ display: "flex", justifyContent: "space-around", backgroundColor: "grey", color: "white", padding: "10px" }}>
                                    <th style={{ width: "200px", textAlign: "center" }}>Subject name</th>
                                    <th style={{ width: "200px", textAlign: "center" }}>Created By</th>
                                    <th style={{ width: "200px", textAlign: "center" }}>Info</th>
                                    <th style={{ width: "100px", textAlign: "center" }}>Delete</th>
                                    {/* <th style={{ width: "100px", textAlign: "center" }}>Edit</th> */}
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    response?.data?.data?.map(({ subjectName, email, _id }, i) => (
                                        <tr style={{ display: "flex", justifyContent: "space-around", padding: "10px" }} key={i}>
                                            <td style={{ width: "200px", textAlign: "center" }}>{subjectName}</td>
                                            <td style={{ width: "200px", textAlign: "center" }}>{email}</td>
                                            <td style={{ width: "200px", textAlign: "center" }}>
                                                <Link to={`${_id}`}>
                                                    <Button variant="outlined" color="secondary">
                                                        View Exam
                                                    </Button>
                                                </Link>
                                            </td>
                                            <td style={{ width: "100px", textAlign: "center" }}>
                                                <Button variant="outlined" color="error" onClick={() => handleDeleteExam(_id)}>
                                                    Delete
                                                </Button>
                                            </td>
                                            {/* <td style={{ width: "100px", textAlign: "center" }}>
                                                <Button variant="outlined" color="primary" onClick={() => handleEditExam(_id)}>
                                                    Edit
                                                </Button>
                                            </td> */}
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    )
                        : (
                            <div style={{ textAlign: "center", marginTop: "35px" }}>No Data Found</div>
                        )
                }
            </div>
        </>
    )
}

export default ExamsCreated

// email: "4gu4ogg3nx@jkotypc.com"
// notes: ['long noted']
// subjectName: "GK"
// __v: 0
// _id: "67ebb23d380907006241e167"

//     < div >
//     <div style={{ display: "flex", justifyContent: "space-between" }}>
//         <span>Subject</span>
//         <span>Createdby</span>
//     </div>

// {
//     response.map(({ subjectName, email }) => (
//         <div style={{ display: "flex", justifyContent: "space-between" }}>
//             <span>{subjectName}</span>
//             <span>{email}</span>
//         </div>
//     ))
// }
// </div >