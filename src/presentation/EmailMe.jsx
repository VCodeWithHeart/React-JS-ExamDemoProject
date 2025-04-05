import { Box, Button, Container } from '@mui/material'
import React from 'react'
import InputComp from '../shared/InputComp'
import emailMeFields from '../data/emailMeFields'

const EmailMe = ({ handleMail, email, error, handleChange }) => {
    return (
        <>
            <Container maxWidth="sm">
                <Box sx={{ bgcolor: 'lavender', height: 'fit-content', padding: '5px 15px 20px', textAlign: "center", display: "flex", flexDirection: "column", gap: "10px" }}>
                    <h1 style={{ textAlign: "center" }}>Recover Password</h1>
                    <form style={{ display: 'flex', flexDirection: 'column', gap: '3.5px', justifyContent: "center" }}>

                        <p style={{ margin: "15px 0px", padding: "10px" }}>
                            We will send you an email with instructions on how to reset your password.
                        </p>

                        {
                            emailMeFields.map(({ name, type, label }, i) => (
                                <InputComp key={i} {...{ error, name, handleChange, type, forField: { email }, label }} />
                            ))
                        }

                        <Button variant="contained" onClick={handleMail}>Email Me</Button>
                    </form>
                </Box>
            </Container>
        </>
    )
}

export default EmailMe