import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { useTheme, useThemeUpdate } from "../contexts/ThemeContext";
import { Link, useNavigate, Navigate } from "react-router-dom";
import Axios from "axios";
import Select from "react-select";

const CreateUserName = () => {
  const userNameRef = useRef<HTMLInputElement>(null);
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const { currentUser, updateDisplayName } = useAuth();
  const suggestedUserName = currentUser.email.replace(/@.*/, "");

  const options = [
    { value: "badger", label: "Badger" },
    { value: "pit", label: "Pit" },
  ];

  interface OptionType {
    value: string;
    label: string;
  }

  const [selected, setSelected] = useState<OptionType | null>(null);

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

        await updateDisplayName(userNameRef.current?.value);
        await Axios.post("http://localhost:5000/api/newplayer", {
          firstName: firstNameRef.current?.value,
          lastName: lastNameRef.current?.value,
          userName: userNameRef.current?.value,
          leagueName: selected?.value,
          // email: currentUser.email,
        });
        setMessage("Username updated");
        setTimeout(() => {
          navigate("/leaderboard");
        }, 500);
      } catch {
        setError("Failed to update username");
      }
    }
    setLoading(false);
  };

  if (!currentUser) {
    return <Navigate to="/leaderboard" />;
  }

  
  const handleChange = (
    selectedOption: { value: string; label: string } | null
  ) => {
    setSelected(selectedOption);
    console.log(`Option selected:`, selectedOption);
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Create Profile</h2>
          {message && <Alert variant="success">{message}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" id="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="userName"
                ref={userNameRef}
                required
                defaultValue={suggestedUserName}
              />
            </Form.Group>
            <Form.Group className="mb-3" id="firstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="userName"
                ref={firstNameRef}
                required
                placeholder="first name"
              />
            </Form.Group>
            <Form.Group className="mb-3" id="lastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="userName"
                ref={lastNameRef}
                required
                placeholder="last name"
              />
            </Form.Group>

            <Form.Group className="mb-3" id="leagueName">
              <Form.Label>League</Form.Label>

              <Select
                onChange={handleChange}
                options={options}
                autoFocus={true}
              />
              <div className="mt-4">
                {selected && <>You've selected {selected.value}</>}
              </div>
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
