import './css/App.css'
import './Firebase.jsx'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/home/Home.jsx'
import Auth from './pages/auth/Auth.jsx'
import AuthRoute from './components/AuthRoute.jsx'
import GuestRoute from './components/GuestRoute.jsx';
import NotFound from './components/NotFound.jsx'

function App() {
  return (
    <>
      <Router>
        <div></div>
        <div id="centerContent">
          <Header />
          <Routes>
            <Route index path="/" element={<Home />} />
            <Route element={<GuestRoute />}>
              <Route path="/login" element={<Auth key="login" />} />
              <Route path="/register" element={<Auth key="register" />} />
            </Route>
            <Route path='*' element={<NotFound />} />
          </Routes>
          <Footer />
        </div>
        <div></div>
      </Router>
    </>
  )
}

export default App
