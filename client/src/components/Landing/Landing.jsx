import React from 'react';
import { Link } from 'react-router-dom';
import Home from '../Home/Home';
import Style from './Landing.module.css';

export default function Landing() {
  return (
    <div>
      <Link to={Home} className={Style.button}>Go!</Link>
    </div>
  );
}
