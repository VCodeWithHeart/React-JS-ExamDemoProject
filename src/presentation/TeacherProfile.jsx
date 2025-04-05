import { Box, Button, Container } from '@mui/material'
import React from 'react'
import InputComp from '../shared/InputComp'
import resetPasswordFields from '../data/resetPasswordFields'

const TeacherProfile = ({ handlePassword, handleChange, passwordDetails, error }) => {

    return (
        <Container maxWidth="sm" sx={{ padding: "15px" }}>
            <Box sx={{ bgcolor: 'lavender', height: 'fit-content', padding: '5px 15px 20px', textAlign: "center", display: "flex", flexDirection: "column", gap: "10px" }}>
                <h1 style={{ textAlign: "center" }}>Reset Password</h1>
                <form style={{ display: 'flex', flexDirection: 'column', gap: '3.5px', justifyContent: "center" }}>
                    <p style={{ margin: "15px 0px", padding: "10px" }}>
                        Enter your old and new password to reset the password.
                    </p>
                    {
                        resetPasswordFields.map(({ name, type, label }, i) => (
                            <InputComp key={i} {...{ error, name, type, label, handleChange, forField: { passwordDetails } }} />
                        ))
                    }
                    <Button variant="contained" onClick={handlePassword}>Submit</Button>
                </form>
            </Box>
        </Container>
    )
}

export default TeacherProfile