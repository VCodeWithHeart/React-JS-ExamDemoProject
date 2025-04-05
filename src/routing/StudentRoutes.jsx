import { Navigate, Outlet } from 'react-router-dom';

function StudentRoutes({ role }) {

    if (role === "student") {
        return <Outlet />
    }
    else if (role === "teacher") {
        return <Navigate to="/teacher/dashboard" />
    }
    else {
        return <Navigate to="/" />
    }

    // return role === "student" ? <Outlet /> : <Navigate to="/" />; // url manipulation me kahi na jaye
}

export default StudentRoutes;