import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Landing from './components/Landing/Landing';
import Home from './components/Home/Home';
import BreedDetail from './components/BreedDetail/BreedDetail';
import BreedCreation from './components/BreedCreation/BreedCreation';

function App() {
  return (
    <div>
      <Route exact path="/" component={Landing} />
      <Route exact path="/home" component={Home} />
      <Switch>
        <Route exact path="/home/creation" component={BreedCreation} />
        <Route exact path="/home/:id" component={BreedDetail} />
      </Switch>
    </div>
  );
}

export default App;
