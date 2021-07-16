import React from 'react';
import { Route } from 'react-router-dom';
import Landing from '../components/Landing/Landing';
import Nav from '../components/Nav/Nav';
import Searchbar from '../components/SearchBar/SearchBar';
import Home from '../components/Home/Home';
import BreedDetail from '../components/BreedDetail/BreedDetail';
import BreedCreation from '../components/BreedCreation/BreedCreation';

function App() {
  return (
    <div>
      <Route exact path="/" component={Landing} />
      <Route exact path="/:any" component={Nav} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/home" component={Searchbar} />
      <Route path="/detail/:id" component={BreedDetail} />
      <Route exact paath="/creation" component={BreedCreation} />
    </div>
  );
}

export default App;
