import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const darkTheme = useTheme();

  const themeStyles = {
    backgroundColor: darkTheme ? "#333" : "#ffffff",
    color: darkTheme ? "#CCC" : "#333",
  };

  const emailRef = useRef<HTMLInputElement>(null);
  const { resetPassword } = useAuth();

  const [error, setError] = useState<String>("");
  const [message, setMessage] = useState<String>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setError("");
      setMessage("");
      setLoading(true);
      await resetPassword(emailRef.current?.value);
      setMessage("Check your inbox for further instructions");
      // navigate("/login")
    } catch {
      setError("Failed to reset password");
    }
    setLoading(false);
  };

  return (
    <>
      <Card style={themeStyles}>
        <Card.Body>
          <h2 className="text-center mb-4">Password Reset</h2>
          {message && <Alert variant="success">{message}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Reset Password
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/login">Log In</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
    </>
  );
};

export default ForgotPassword;
