import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import AppRoutes from './routes/AppRoutes';
import NavBar from './components/NavBar/Navigation';
import Footer from './components/Footer/Footer';
import UserMessage from './components/UserMessage/UserMessage';
import { useState, useEffect } from "react"
import { useLocation } from 'react-router-dom';

function App() {

  const [showVar, setShowVar] = useState(false)


  let location = useLocation();

  useEffect(() => {

    setShowVar(window.location.pathname === '/')
  }, [location]);

  return (

    <div className="App">

      {
        !showVar && <NavBar />
      }

      <AppRoutes />

      {
        !showVar && <Footer />
      }

      <UserMessage />

    </div >
  );
}

export default App;
