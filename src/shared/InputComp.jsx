import { TextField } from '@mui/material'
import React from 'react'

const InputComp = ({ error, name, type, label, handleChange, forField, styles }) => {
    const setFor = Object.values(forField)[0]
    return (
        <>
            <TextField
                error={error[name]?.status || false}
                label={label}
                name={name}
                type={type}
                helperText={error[name]?.message}
                onChange={(e) => handleChange(e)}
                sx={{ marginBottom: "10px" }}
                value={setFor[name] || ""}
            />
        </>
    )
}

export default InputComp