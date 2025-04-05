import React from 'react'
import ArticleIcon from '@mui/icons-material/Article';
import { Link, Outlet, useLocation } from 'react-router-dom';

const TeacherDashboard = () => {
    const location = useLocation()

    const { pathname } = location

    return (
        <>
            {
                pathname === "/teacher/dashboard" ? (
                    <>
                        <div style={{ padding: "15px", display: "flex", gap: "25px" }}>
                            <div>
                                <div style={{ display: "flex", flexDirection: "column", width: "fit-content", alignItems: "center" }}>
                                    <Link to={`${location.pathname}/examscreated`} style={{ textDecoration: "none", color: "grey" }}>
                                        <ArticleIcon sx={{ fontSize: "4em" }} />
                                    </Link>
                                    <span>Exams Created</span>
                                </div>
                            </div>

                            <div>
                                <div style={{ display: "flex", flexDirection: "column", width: "fit-content", alignItems: "center" }}>
                                    <Link to="createexams" style={{ textDecoration: "none", color: "grey" }}>
                                        <ArticleIcon sx={{ fontSize: "4em" }} />
                                    </Link>
                                    <span>Create Exams</span>
                                </div>
                            </div>
                        </div>
                    </>
                )
                    :
                    (
                        <>
                            <Outlet />
                        </>
                    )
            }
        </>
    )
}

export default TeacherDashboard

// can create an array of teacherOptions but for now not