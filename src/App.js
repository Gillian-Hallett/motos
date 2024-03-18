import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux'; // Import Provider from react-redux
import index from './store/index';
import Login from './componets/Login';
import Regis from './componets/Regis';
import Motos from './componets/Motos';
import Medidor from './componets/Medidor';
import Info from './componets/Info';

function App() {
  return (
    <Provider store={index}> 
      <Router>
        <Routes>
          <Route path="/" element={<Motos />} />
          <Route path="/Medidor" element={<Medidor />} />
          <Route path="/Info/:make/:model/:year" element={<Info />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Regis" element={<Regis />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
