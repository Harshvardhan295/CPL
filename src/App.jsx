import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Home from './pages/Home.jsx';
import Auction from './pages/Auction.jsx';
import About from './pages/About.jsx';
import Rules from './pages/Rules.jsx';
import MatchSchedule from './pages/MatchSchedule.jsx';
import { AuctionProvider } from './context/AuctionContext.jsx';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auction" element={<Auction />} />
        <Route path="/rules" element={<Rules />} />
        <Route path="/match-schedule" element={<MatchSchedule />} />
        <Route path="/about-us" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;