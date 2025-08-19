import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Auction from './pages/Auction.jsx';
import Contact from './pages/Contact.jsx';
import About from './pages/About.jsx';
import Rules from './pages/Rules.jsx';
import { AuctionProvider } from './context/AuctionContext.jsx';

function App() {
  return (
    <AuctionProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auction" element={<Auction />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/rules" element={<Rules />} />
        </Routes>
      </Router>
    </AuctionProvider>
  );
}

export default App;