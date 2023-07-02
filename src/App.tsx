import React from 'react';
import { BrowserRouter as Router , Route,Routes} from 'react-router-dom';
import Navbar from './components/Navbar';
import { Provider } from 'react-redux';
import store from './Redux/Store';
import Home from './components/Home';
import Login from './components/Login';
import Registration from './components/Registration';
import Protected from './components/Protected';
function App() {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Routes>
          <Route index path="/" element={<Protected Component={Home} />} />
          <Route index path="/login" element={<Login />} />
          <Route index path="/registration" element={<Registration />} />

        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
