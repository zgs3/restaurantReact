import './App.css';
import Header from './components/header/Header';
import Home from './components/home/Home';
import Restaurant from './components/restaurant/Restaurant';
import Dish from './components/dish/Dish';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/login/Login';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path='/home' element={<Home />} />
          <Route exact path='/restaurants' element={<Restaurant />} />
          <Route exact path='/dishes' element={<Dish />} />
          <Route exact path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
