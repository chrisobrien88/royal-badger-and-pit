import React from 'react'
import { Card, Alert} from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate, Navigate } from 'react-router-dom'


const Dashboard = () => {

  const [error, setError] = React.useState<string>('')
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogOut = async () => {
    setError('')
    try {
      await logout()
      navigate('/login')
    }
    catch {
      setError('Failed to log out')
    }
  }

  if (!currentUser) {
    return <Navigate to="/login" />
}

  console.log(currentUser);
  

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email:</strong> {currentUser.email}
          <br />
          <strong>Username:</strong> {currentUser.displayName}
          <Link to="/submit-new-score" className="btn btn-primary w-100 mt-3">Submit new score</Link>
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">Update Profile</Link>
          <Link to="/leaderboard" className="btn btn-primary w-100 mt-3">View Leaderboard</Link>
          <Link to="/my-stats"  className="btn btn-primary w-100 mt-3">View My Stats</Link>
        </Card.Body>
      </Card>
      <Link to="login" onClick={handleLogOut}>Log Out</Link>
    </>
  )
}

export default Dashboard