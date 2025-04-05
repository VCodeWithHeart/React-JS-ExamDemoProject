import { MenuItem, Select } from '@mui/material'
import React from 'react'

const SelectComp = ({ name, type, error, options, handleChange, forField }) => {
    const setFor = Object.values(forField)[0]
    return (
        <>
            <Select
                className='text-black'
                name={name}
                value={setFor[name] || ""}
                onChange={(e) => handleChange(e)}
                error={error[name]?.status || false}
            >
                {
                    options.map((cur, i) => (
                        <MenuItem key={i} value={cur}>{cur}</MenuItem>
                    ))
                }
            </Select>
            <span style={{ color: "#d32f2f", fontSize: "0.75rem", marginLeft: "14px", lineHeight: "1.66", letterSpacing: "0.03333em", fontWeight: "400" }}>
                {error[name]?.message}</span>
        </>
    )
}

export default SelectComp