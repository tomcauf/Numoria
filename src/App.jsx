import './css/App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Home from './components/Home.jsx'

function App() {
  return (
    <>
      <Router>
        <div></div>
        <div id="centerContent">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
          <Footer />
        </div>
        <div></div>
      </Router>
    </>
  )
}

export default App
