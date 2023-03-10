import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useTheme, useThemeUpdate } from "../contexts/ThemeContext";
import { Link, useNavigate, Navigate } from "react-router-dom";
import Axios from "axios";

const CreateUserName = () => {
  const userNameRef = useRef<HTMLInputElement>(null);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const { currentUser, updateDisplayName } = useAuth();
  const suggestedUserName = currentUser.email.replace(/@.*/, "");

  const [error, setError] = useState<String>("");
  const [message, setMessage] = useState<String>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // check username doesn't already exist

    if (userNameRef.current?.value !== "") {
      try {
        setMessage("");
        setError("");
        setLoading(true);
        console.log(userNameRef.current?.value);

        await updateDisplayName(userNameRef.current?.value);
        await Axios.post("https://cerise-iguana-kit.cyclic.app/api/newplayer", {
          firstName: firstNameRef.current?.value,
          lastName: lastNameRef.current?.value,
          userName: userNameRef.current?.value,
          email: currentUser.email,
        });
        setMessage("Username updated");
        setTimeout(() => {
          navigate("/dashboard");
        }, 500);
      } catch {
        setError("Failed to update username");
      }
    }
    setLoading(false);
  };

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Create Profile</h2>
          {message && <Alert variant="success">{message}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" id="email">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="userName"
                ref={userNameRef}
                required
                defaultValue={suggestedUserName}
              />
            </Form.Group>
            <Form.Group className="mb-3" id="email">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="userName"
                ref={firstNameRef}
                required
                placeholder="first name"
              />
            </Form.Group>
            <Form.Group className="mb-3" id="email">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="userName"
                ref={lastNameRef}
                required
                placeholder="last name"
              />
            </Form.Group>

            <Button disabled={loading} className="w-100" type="submit">
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default CreateUserName;
