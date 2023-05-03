import { User } from 'firebase/auth'
import { FC } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import AuthCard from '../pages/AuthCard'
import Home from '../pages/Home'

interface Props {
  user: User | null
}

const AppRoutes: FC<Props> = ({ user }) => {
  return (
    <Routes>
      <Route
        path="/login"
        element={user ? <Navigate to="/" /> : <AuthCard />}
      />
      <Route
        path="/"
        element={user ? <Home /> : <Navigate to="/login" />}
      />
    </Routes>
  )
}

export default AppRoutes
