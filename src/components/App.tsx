import Signup from './Signup';
import ForgotPassword from './ForgotPassword';
import { Container } from 'react-bootstrap';
import { AuthProvider } from '../contexts/AuthContext';
import Dashboard from './Dashboard';
import Login from './Login';
import { ThemeProvider} from '../contexts/ThemeContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UpdateProfile from './UpdateProfile';
import Leaderboard from './Leaderboard';
import SubmitNewScore from './SubmitNewScore';
import MyStats from './MyStats';
import Navbar from './Navbar';
import CreateProfile from './CreateProfile';

const windowHeight = window.innerHeight*0.9;

function App() {


  return (
    <>
      
          <Router>
            <ThemeProvider >
              <AuthProvider >
                <Container
                  className="d-flex align-items-center justify-content-center">
                  <div className='w-100' style={{ 
                    width: 1, height: windowHeight, overflow: "scroll"
                  }}>
                    <Routes>
                      <Route path="/dashboard" element={<Dashboard />}/>
                      <Route path="/update-profile" element={<UpdateProfile />}/>
                      <Route path="/signup" element={<Signup/>}/>
                      <Route path="/" element={<Login/>}/>
                      <Route path="/login" element={<Login/>}/>
                      <Route path="/forgot-password" element={<ForgotPassword/>}/>
                      <Route path="/leaderboard" element={<Leaderboard/>}/>
                      <Route path="/submit-new-score" element={<SubmitNewScore/>}/>
                      <Route path="/my-stats" element={<MyStats/>}/>
                      <Route path="/create-profile" element={<CreateProfile/>}/>
                      <Route path="*" element={<h1>404</h1>}/>
                    </Routes>
                  </div>
                  <Navbar/>
                </Container>
              </AuthProvider>
            </ThemeProvider>
          </Router>
    </>
  );
}

export default App;
