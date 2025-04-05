import React from 'react'
import { Button } from '@mui/material';
import studentData from '../data/studentData';
import InputComp from '../shared/InputComp';


const StudentProfile = ({ response, handleChange, handleEdit, error, studentDetails }) => {

    return (
        <>
            <div style={{ display: "flex", flexDirection: "column", gap: "7px", padding: "15px" }}>
                <div style={{ display: "flex", flexDirection: "column", backgroundColor: "dodgerblue", padding: "20px", color: "white", gap: "7px" }}>
                    <label>Name: {response?.data?.data?.name}</label>
                    <label>Email: {response?.data?.data?.email}</label>
                    <label>Role: {response?.data?.data?.role}</label>
                </div>

                <div style={{ display: "flex", flexDirection: "column", backgroundColor: "lightgray", padding: "20px", color: "white", gap: "7px" }}>
                    <h2 style={{ marginBottom: "5px" }}>Edit Details</h2>

                    {
                        studentData.map(({ name, type, label }, i) => (
                            <InputComp key={i} {...{ error, name, type, label, handleChange, forField: { studentDetails } }} />
                        ))
                    }

                    <Button variant="outlined" sx={{ width: "50px", color: "white", border: "1px solid white" }} disableElevation onClick={handleEdit}>
                        Edit</Button>
                </div>
            </div>

        </>
    )
}

export default StudentProfile