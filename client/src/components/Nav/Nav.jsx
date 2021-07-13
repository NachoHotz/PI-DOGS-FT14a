import React from 'react';
import { Link } from 'react-router-dom';
import Style from './Nav.module.css';
import { BreedCreation } from '../BreedCreation/BreedCreation';

export default function Nav() {
  return (
    <header>
      <nav>
        <Link to={BreedCreation} className={Style.createButton}>Create Breed</Link>
      </nav>
    </header>
  );
}
