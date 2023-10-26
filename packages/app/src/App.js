import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import CreatemonsterScreen from './screens/CreateMonsterScreen';
import { Container } from 'react-bootstrap';
import MonstersListScreen from './screens/MonstersListScreen';

function App() {
  return (
    <Router>
      <main className='py-3'>
        <Container>
          <Routes>
            <Route path='/' exact element={<HomeScreen />} />
            <Route path='/create-monster' element={<CreatemonsterScreen />} />
            <Route path='/monsters-list' element={<MonstersListScreen/>} />
          </Routes>
        </Container>
      </main>
    </Router>
  );
}

export default App;
