import './App.css';
import AppRoutes from './routes/AppRoutes';
import NavBar from './components/NavBar/Navigation';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <NavBar />
      <AppRoutes />
    </div>
  );
}

export default App;
