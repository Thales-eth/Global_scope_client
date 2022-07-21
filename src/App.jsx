import './App.css';
import AppRoutes from './routes/AppRoutes';
import 'bootstrap/dist/css/bootstrap.min.css'
import NavBar from './components/NavBar/Navigation';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className="App">

      {
        !window.location.href === 'http://localhost:3000/' && <NavBar />
      }
      <AppRoutes />
      {
        !window.location.href === '/' && <Footer />
      }

    </div >
  );
}

export default App;
