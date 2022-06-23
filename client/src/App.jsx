import React from 'react';
import { Route, Routes } from 'react-router-dom';
import {
  VIEW_CREATION,
  VIEW_LANDING,
  VIEW_HOME,
  VIEW_DETAIL,
} from './config/routes/paths';
import Landing from './components/Landing/Landing';
import Home from './components/Home/Home';
import BreedDetail from './components/BreedDetail/BreedDetail';
import BreedCreation from './components/BreedCreation/BreedCreation';

function App() {
  return (
    <div>
      <Routes>
        <Route path={VIEW_LANDING} element={<Landing />} />
        <Route path={VIEW_HOME} element={<Home />} />
        <Route path={VIEW_CREATION} element={<BreedCreation />} />
        <Route path={VIEW_DETAIL} element={<BreedDetail />} />
      </Routes>
    </div>
  );
}

export default App;
