import React from 'react';
import Signup from './Signup';
import { Container } from 'react-bootstrap';
import { AuthProvider } from '../contexts/AuthContext';
import { ThemeProvider, useThemeUpdate } from '../contexts/ThemeContext';


export const ThemeContext = React.createContext<boolean>(true);

function App() {

  const toggleTheme = useThemeUpdate();

  return (
    <ThemeProvider>
      <button onClick={toggleTheme}>Toggle Theme</button>
    <AuthProvider >
      <Container 
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}>
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Signup/>
        </div>
      </Container>
    </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
