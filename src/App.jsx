import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SignupContainer from './containers/SignupContainer'
import LoginContainer from './containers/LoginContainer'
import ErrorPage from './presentation/ErrorPage'
import StudentRoutes from './routing/StudentRoutes'
import Layout from './layout/Layout'
import TeacherRoutes from './routing/TeacherRoutes'
import { useAuth } from './provider/AuthProvider'
import EmailMeContainer from './containers/EmailMeContainer'
import NewPasswordContainer from './containers/NewPasswordContainer'
import StudentsContainer from './containers/StudentsContainer'
import StudentProfileContainer from './containers/StudentProfileContainer'
import { Navigate } from 'react-router-dom';
import TeacherDashboard from './presentation/TeacherDashboard'
import ExamsCreatedContainer from './containers/ExamsCreatedContainer'
import CreateExamsContainer from './containers/CreateExamsContainer'
import ProfileContainer from './containers/ProfileContainer'
import PublicRoutes from './routing/PublicRoutes'
import StudentDetailsContainer from './containers/StudentDetailsContainer'
import EditExamContainer from './containers/EditExamContainer'
import StudentDashboardContainer from './containers/StudentDashboardContainer'
import GiveExamContainer from './containers/GiveExamContainer'

const App = () => {
  const [role, setRole] = useState(localStorage.getItem("role"))
  const { token } = useAuth()
  const [authenticated, isAuthenticated] = useState(false)
  const [allExamData, setAllExamData] = useState([])
  const [notes, setNotes] = useState()

  const handleExamNotes = (notes) => {
    setNotes(notes)
  }

  useEffect(() => {
    const storedRole = localStorage.getItem("role")

    if (storedRole && token) {
      setRole(storedRole)
      isAuthenticated(true)
    }

  }, [token])

  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route element={<PublicRoutes {...{ role, authenticated }} />}>
            <Route path='/' element={<LoginContainer {...{ role, setRole }} />} />
            <Route path='/signup' element={<SignupContainer />} />
            <Route path='/emailme' element={<EmailMeContainer />} />
            <Route path='/newPassword' element={<NewPasswordContainer />} />
          </Route>

          <Route element={authenticated && role === "student" ? <StudentRoutes role={role} /> : <Navigate to="/" />}>
            <Route path='/student' element={<Layout {...{ role, isAuthenticated }} />}>
              <Route path='dashboard' element={<StudentDashboardContainer {...{ handleExamNotes }} />}>
                <Route path='giveexam/:id' element={<GiveExamContainer {...{ notes }} />} />
              </Route>
              <Route path='profile' element={<StudentProfileContainer />} />
            </Route>
          </Route>

          <Route element={authenticated && role === "teacher" ? <TeacherRoutes role={role} /> : <Navigate to="/" />}>
            <Route path='/teacher' element={<Layout {...{ role, isAuthenticated }} />}>
              <Route path='dashboard' element={<TeacherDashboard />}>
                <Route path='examscreated' element={<ExamsCreatedContainer {...{ allExamData, setAllExamData }} />} />
                <Route path="createexams" element={<CreateExamsContainer />} />
              </Route>
              {/* <Route path='dashboard/examscreated/:id' element={<ViewExamDetailsContainer />} /> */}
              <Route path='dashboard/examscreated/:id' element={<EditExamContainer {...{ allExamData }} />} />
              <Route path='profile' element={<ProfileContainer />} />

              <Route path='student/' element={<StudentsContainer />} />
              <Route path='student/studentDetails/:id' element={<StudentDetailsContainer />} />
            </Route>
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App