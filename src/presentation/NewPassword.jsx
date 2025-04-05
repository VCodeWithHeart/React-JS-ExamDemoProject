import { Box, Button, Container } from '@mui/material'
import React from 'react'
import InputComp from '../shared/InputComp'
import newPasswordFields from '../data/newPasswordFields'

const NewPassword = ({ handlePassword, handleChange, password, error }) => {
    return (
        <Container maxWidth="sm">
            <Box sx={{ bgcolor: 'lavender', height: 'fit-content', padding: '5px 15px 20px', textAlign: "center", display: "flex", flexDirection: "column", gap: "10px" }}>
                <h1 style={{ textAlign: "center" }}>Recover Password</h1>
                <form style={{ display: 'flex', flexDirection: 'column', gap: '3.5px', justifyContent: "center" }}>

                    <p style={{ margin: "15px 0px", padding: "10px" }}>
                        you can reset your password.
                    </p>

                    {
                        newPasswordFields.map(({ name, type, label }, i) => (
                            <InputComp key={i} {...{ error, name, type, label, handleChange, forField: { password } }} />
                        ))
                    }

                    <Button variant="contained" onClick={handlePassword}>Submit</Button>
                </form>
            </Box>
        </Container>
    )
}

export default NewPassword