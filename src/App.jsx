import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Screen from './pages/Screen.jsx';
import Auction from './pages/Auction.jsx';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Screen />} />
        <Route path="/auction" element={<Auction />} />
      </Routes>
    </Router>
  );
}

export default App;
