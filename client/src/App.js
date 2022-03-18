import logo from './logo.svg';
import { BrowserRouter, Route } from 'react-router-dom';
import Landing from './components/views/LandingPage/LandingPage';
import NavBar from './components/views/NavBar/NavBar';
import UploadVideoPage from './components/views/UploadVideoPage/UploadVideoPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import Auth from './hoc/auth';
import './App.css';

function App() {
  return (
    <BrowserRouter> 
    <NavBar/>
   <div className="App">  
     <Route exact path='/' component={Landing}/>
     <Route exact path="/login" component={Auth(LoginPage, false)} />
     <Route exact path="/register" component={Auth(RegisterPage, false)} />
     <Route exact path="/upload" component={UploadVideoPage} />

    </div>
    </BrowserRouter>
  );
}

export default App;