import './App.css';
import AppRoutes from './routes/AppRoutes';
import 'bootstrap/dist/css/bootstrap.min.css'
import NavBar from './components/NavBar/Navigation';
import Footer from './components/Footer/Footer';
import { useState, useEffect } from "react"
import { useLocation } from 'react-router-dom';

function App() {

  const [showVar, setShowVar] = useState(false)


  let location = useLocation();

  useEffect(() => {
    console.log('EN V6', location)
    setShowVar(window.location.pathname === '/')
  }, [location]);



  return (

    <div className="App">

      {
        !showVar && <NavBar />
      }
      {/* <NavBar /> */}
      <AppRoutes />
      {/* <Footer /> */}
      {
        !showVar && <Footer />
      }

    </div >
  );
}

export default App;
