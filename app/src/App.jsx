// import "./App.css";
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import Footer from './components/layout/Footer';
import Navbar from './components/layout/Navbar';
import Container from "./components/layout/Container";
import Home from './components/pages/Home'
import Login from './components/pages/Login';
import Areas from './components/pages/Areas';
import Trees from './components/pages/Trees';
import Monitoring from './components/pages/Monitoring';

function App() {
  return (
    <Router>
      <Navbar />
      <Container customClass="min-height">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/areas" element={<Areas />}></Route>
          <Route path="/trees" element={<Trees />}></Route>
          <Route path="/monitoring" element={<Monitoring />}></Route>
        </Routes>
      </Container>
      <Footer />
    </Router>
  )
}

export default App
