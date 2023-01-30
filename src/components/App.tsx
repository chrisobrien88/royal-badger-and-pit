import React, {useContext} from 'react';
import Signup from './Signup';
import { Container } from 'react-bootstrap';
import { AuthProvider } from '../contexts/AuthContext';
import { ThemeProvider, useThemeUpdate, useTheme } from '../contexts/ThemeContext';



function App() {


  const darkTheme = useTheme();
  const toggleTheme = useThemeUpdate();

  const themeStyles = {
    backgroundColor: darkTheme ? '#333' : '#ffffff',
    color: darkTheme ? '#CCC' : '#333'
}

  return (
    <ThemeProvider >
      <AuthProvider >
        <Container 
          className="d-flex align-items-center justify-content-center"
          style={{ minHeight: "100vh" }}>
          <div className="w-100" style={{ maxWidth: "400px" }}>
            {/* why is this button not working but the same button in Signup.tsx does work? */}
          <button style={themeStyles} onClick={toggleTheme}>{darkTheme? "light" : "dark" }</button>
            <Signup/>
          </div>
        </Container>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
