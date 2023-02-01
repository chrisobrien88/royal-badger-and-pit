import React, { useRef, useState }from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { useTheme, useThemeUpdate } from '../contexts/ThemeContext'
import { Link, useNavigate } from 'react-router-dom'

const Signup = () => {

    const darkTheme = useTheme()
    const toggleTheme = useThemeUpdate()

    const themeStyles = {
        backgroundColor: darkTheme ? '#333' : '#ffffff',
        color: darkTheme ? '#CCC' : '#333'
    }

    const themeButtonStyles = {
        backgroundColor: !darkTheme ? '#333' : '#ffffff',
        color: !darkTheme ? '#CCC' : '#333'
    }

    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const passwordConfirmRef = useRef<HTMLInputElement>(null)
    const navigate = useNavigate()
    const { signup } = useAuth()

    const [error, setError] = useState<String>('')
    const [loading, setLoading] = useState<boolean>(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (passwordRef.current?.value !== passwordConfirmRef.current?.value) {
            return setError('Passwords do not match')
        }

        try {
            setError('')
            setLoading(true)
            await signup(emailRef.current?.value, passwordRef.current?.value)
            navigate("/create-profile")


        }
        catch {
            setError('Failed to create an account')
        }
        setLoading(false)
    }

  return (
    <>
        <Card style={themeStyles}>
            <Card.Body>
                <h2 className="text-center mb-4">Sign Up</h2>
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
                    <Form.Group className="mb-3" id="password-confirm">
                        <Form.Label>Password Confirmation</Form.Label>
                        <Form.Control type="password" ref={passwordConfirmRef} required />
                    </Form.Group>
                    <Button disabled={loading} className="w-100" type="submit">Signup</Button>
                </Form>
            </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
            Already have an account? <Link to="/login">Log in</Link>
        </div>
    </>
  )
}

export default Signup