import { Navigate, Outlet } from 'react-router-dom';

function TeacherRoutes({ role }) {

    if (role === "teacher") {
        return <Outlet />
    }
    else if (role === "student") {
        return <Navigate to="/student/dashboard" />
    }
    else {
        return <Navigate to="/" />
    }

    // return role === "teacher" ? <Outlet /> : <Navigate to="/" />;
}

export default TeacherRoutes;