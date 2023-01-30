import React, { useRef, useState }from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { useTheme } from '../contexts/ThemeContext'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {

    const darkTheme = useTheme()

    const themeStyles = {
        backgroundColor: darkTheme ? '#333' : '#ffffff',
        color: darkTheme ? '#CCC' : '#333'
    }

    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const { login } = useAuth()

    const [error, setError] = useState<String>('')
    const [loading, setLoading] = useState<boolean>(false)
    const navigate = useNavigate()
    

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            setError('')
            setLoading(true)
            await login(emailRef.current?.value, passwordRef.current?.value)
            navigate("/dashboard")
        }
        catch {
            setError('Failed to log in')
        }
        setLoading(false)
    }

  return (
    <>
        <Card style={themeStyles}>
            <Card.Body>
                <h2 className="text-center mb-4">Log In</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" ref={emailRef} required />
                    </Form.Group>
                    <Form.Group className="mb-3" id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" ref={passwordRef} required />
                    </Form.Group>
                    <Button disabled={loading} className="w-100" type="submit">Log In</Button>
                </Form>
                <div className="w-100 text-center mt-3">
                    <Link to="/forgot-password">Forgot Password?</Link>
                </div>
            </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
            Need an account? <Link to="/signup">Sign Up</Link>
        </div>
    </>
  )
}

export default Login