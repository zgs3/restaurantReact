import './App.css';
import Restaurant from './components/restaurant/Restaurant';
import Dish from './components/dish/Dish';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Footer from './components/footer/Footer';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Restaurant />} />
          <Route exact path='/restaurants' element={<Restaurant />} />
          <Route exact path='/dishes' element={<Dish />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/register' element={<Register />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
