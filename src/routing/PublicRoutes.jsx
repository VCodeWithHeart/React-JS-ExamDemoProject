import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const PublicRoutes = ({ role, authenticated }) => {

    if (authenticated) {
        if (role === "student") {
            return <Navigate to="/student/dashboard" />
        }
        else if (role === "teacher") {
            return <Navigate to="/teacher/dashboard" />
        }
    }

    return <Outlet />

}

export default PublicRoutes