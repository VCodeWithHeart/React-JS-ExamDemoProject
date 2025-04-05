import React from 'react'
import './PreLoader.css'

const PreLoader = () => {
    return (
        <div style={{ display: "flex", justifyContent: "center", height: "100vh", alignItems: "center" }}>
            <div className="loader"></div>
        </div>
    )
}

export default PreLoader