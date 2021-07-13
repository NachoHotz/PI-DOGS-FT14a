import React from 'react';
import { Route } from 'react-router-dom';
import Landing from '../components/Landing/Landing';
import Home from '../components/Home/Home';
import Nav from '../components/Nav/Nav';
import BreedDetail from '../components/BreedDetail/BreedDetail';
import BreedCreation from '../components/BreedCreation/BreedCreation';

function App() {
  return (
    <div>
      <Route exact path="/" component={Landing} />
      <Nav />
      <Route path="/home" component={Home} />
      <Route path="/detail/:id" component={BreedDetail} />
      <Route paath="/creation" component={BreedCreation} />
    </div>
  );
}

export default App;
