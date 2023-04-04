import './App.css';
import CoinList from './components/CoinList';
import CoinDetails from './components/CoinDetails';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
function App() {
  return (
   <BrowserRouter>
     <Routes>
        <Route path='/' element={<CoinList />} />
        <Route path='/details/:coinId' element={<CoinDetails />} />
     </Routes> 
   </BrowserRouter>
  );
}

export default App;
