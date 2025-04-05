import { Box, Button, Container, TextField } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import loginFields from '../data/loginFields'
import InputComp from '../shared/InputComp'

const Login = ({ handleChange, handleLogin, error, login }) => {
    return (
        <>
            <Container maxWidth="sm">
                <Box sx={{ bgcolor: 'lavender', height: 'fit-content', padding: '5px 15px 20px', textAlign: "center", display: "flex", flexDirection: "column", gap: "10px" }}>
                    <h1 style={{ textAlign: "center" }}>Login</h1>
                    <form style={{ display: 'flex', flexDirection: 'column', gap: '3.5px', justifyContent: "center" }}>
                        {
                            loginFields.map(({ name, type, label }, i) => (
                                <InputComp key={i} {...{ error, name, type, label, handleChange, forField: { login } }} />
                            ))
                        }
                        <Button variant="contained" onClick={handleLogin}>Login</Button>
                    </form>

                    <span>
                        <Link to="/emailme">Forgot Password</Link>
                    </span>

                    <span style={{ textAlign: 'center', width: "100%" }}>Don't have an account? <Link to="/signup">Create One</Link></span>
                </Box>
            </Container>
        </>
    )
}

export default Login