import React from 'react';
import { Link } from 'react-router-dom';
import Style from './Landing.module.css';

export default function Landing() {
  return (
    <div className={Style.landingBody}>
      <h2 className={Style.title}>Welcome to Dogspedia!</h2>
      <Link className={Style.link} to="/home/">
        Enter!
      </Link>
    </div>
  );
}
