import { CircularProgress } from '@mui/material'
import React from 'react'

const Loader = () => {
    return (
        <div style={{ backgroundColor: "#181818", width: "100%", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <CircularProgress />
        </div>
    )
}

export default Loader