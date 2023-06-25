import { Routes, Route } from 'react-router-dom';
import Header from './component/Header';
import Home from './component/Home';
import Coins from './component/Coins';
import CoinsDetails from './component/CoinsDetails';
import Exchange from './component/Exchange';
const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/coins" element={<Coins />} />
        <Route path="/exchange" element={<Exchange />} />
        <Route path="coins/:id" element={<CoinsDetails />} />
      </Routes>
    </>
  );
};

export default App;
