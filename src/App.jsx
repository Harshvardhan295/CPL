import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Screen from './pages/Screen';
import Auction from './pages/auction';

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
