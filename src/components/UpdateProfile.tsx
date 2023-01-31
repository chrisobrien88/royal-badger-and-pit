import React, { useRef, useState }from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContext'
import { useTheme, useThemeUpdate } from '../contexts/ThemeContext'
import { Link, useNavigate, Navigate } from 'react-router-dom'

const UpdateProfile = () => {

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
    const { currentUser, updateEmail, updatePassword } = useAuth()

    

    const [error, setError] = useState<String>('')
    const [message, setMessage] = useState<String>('')
    const [loading, setLoading] = useState<boolean>(false)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (passwordRef.current?.value !== passwordConfirmRef.current?.value) {            
            return setError('Passwords do not match')
        }

        const promises: Promise<any>[] = []
            setMessage('')
            setError('')
            setLoading(true)
            if (emailRef.current?.value !== currentUser.email) {
                promises.push(updateEmail(emailRef.current?.value))
            }
            if (passwordRef.current?.value) {
                promises.push(updatePassword(passwordRef.current?.value))
            }
            Promise.all(promises).then(() => {
                navigate("/dashboard")
            }).catch(() => {
                setError('Failed to update account')
            }).finally(() => {
                setLoading(false)
            })
    }

    if (!currentUser) {
        return <Navigate to="/login" />
    }

  return (
    <>
        <Card style={themeStyles}>
            <Card.Body>
                <h2 className="text-center mb-4">Update Profile</h2>
                {message && <Alert variant="success">{message}</Alert>}
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" ref={emailRef} required defaultValue={currentUser.email}/>
                    </Form.Group>
                    <Form.Group className="mb-3" id="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" ref={passwordRef} placeholder='Leave blank to keep the same'/>
                    </Form.Group>
                    <Form.Group className="mb-3" id="password-confirm">
                        <Form.Label>Password Confirmation</Form.Label>
                        <Form.Control type="password" ref={passwordConfirmRef} placeholder='Leave blank to keep the same'/>
                    </Form.Group>
                    <Button disabled={loading} className="w-100" type="submit">Update</Button>
                </Form>
            </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
            <Link to="/dashboard">Cancel</Link>
        </div>
    </>
  )
}

export default UpdateProfile