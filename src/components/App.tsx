import Signup from './Signup';
import ForgotPassword from './ForgotPassword';
import { Container } from 'react-bootstrap';
import { AuthProvider } from '../contexts/AuthContext';
import Dashboard from './Dashboard';
import Login from './Login';
import { ThemeProvider} from '../contexts/ThemeContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import UpdateProfile from './UpdateProfile';



function App() {


  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}>
      <div className='w-100' style={{ maxWidth: '400px' }}>
        <Router>
          <ThemeProvider >
            <AuthProvider >
              {/* <Navbar/> */}
              <Routes>
                <Route 
                  path="/dashboard" 
                  element={
                    <PrivateRoute >
                      <Dashboard />
                    </PrivateRoute>
                  }/>
                  <Route 
                  path="/update-profile" 
                  element={
                    <PrivateRoute >
                      <UpdateProfile />
                    </PrivateRoute>
                  }/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/login" element={<Login/>}/>
                <Route path="/forgot-password" element={<ForgotPassword/>}/>
              </Routes>
            </AuthProvider>
          </ThemeProvider>
        </Router>
      </div>
    </Container>
  );
}

export default App;
