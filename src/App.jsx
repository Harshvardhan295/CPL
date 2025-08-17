import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Auction from './pages/Auction.jsx';
import Contact from './pages/Contact.jsx'; // Assuming you have this file
import About from './pages/About.jsx';   // Assuming you have this file
import Rules from './pages/Rules.jsx';     // Assuming you have this file

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Set Auction as the main page */}
        <Route path="/" element={<Auction />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/rules" element={<Rules />} />
      </Routes>
    </Router>
  );
}

export default App;