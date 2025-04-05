import React from 'react'
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import signupFields from '../data/signupFields';
import InputComp from '../shared/InputComp';
import SelectComp from '../shared/SelectComp';

const Signup = ({ handleChange, handleSignUp, error, signup }) => {

    return (
        <>
            <Container maxWidth="sm">
                <Box sx={{ bgcolor: 'lavender', height: 'fit-content', padding: '5px 15px 20px' }}>
                    <h1 style={{ textAlign: "center" }}>SignUp</h1>
                    <form style={{ display: 'flex', flexDirection: 'column', gap: '3.5px', justifyContent: "center" }}>

                        {
                            signupFields.map(({ name, type, label, options }, i) => {

                                switch (type) {
                                    case "text":
                                    case "email":
                                    case "password":
                                        return (<InputComp key={i} {...{ error, name, type, label, handleChange, forField: { signup } }} />)
                                    case "select":
                                        return (<SelectComp key={i} {...{ label, name, type, error, options, handleChange, forField: { signup } }} />)
                                    default:
                                        break;
                                }
                            })}

                        <Button variant="contained" onClick={handleSignUp}>SignUp</Button>
                    </form>

                    <span style={{ textAlign: 'center', width: "100%", display: "inline-block", marginTop: "10px" }}>Already have an account? <Link to="/">login in</Link></span>
                </Box>
            </Container>
        </>
    )
}

export default Signup