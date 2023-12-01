import React from "react";
import { Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate, Navigate } from "react-router-dom";

const Dashboard = () => {
  const [error, setError] = React.useState<string>("");
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    setError("");
    try {
      await logout();
      navigate("/login");
    } catch {
      setError("Failed to log out");
    }
  };

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <Card
        style={{
          width: "100%",
          maxWidth: "400px",
          margin: "auto",
          marginTop: "20px",
        }}
      >
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email:</strong> {currentUser.email}
          <br />
          <strong>Username:</strong> {currentUser.displayName}
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            Update Profile
          </Link>
          <Link
            to="login"
            className="btn btn-primary w-100 mt-3"
            onClick={handleLogOut}
          >
            Log Out
          </Link>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Last Updated by COB on: {new Date(Date.now()).toString().slice(4, 21)}
      </div>
    </>
  );
};

export default Dashboard;
