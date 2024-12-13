import React from 'react';
import './Banner.css';

function Banner(props) {
  return (
    <div className="hero-banner">
      <h1>{props.text}</h1>
    </div>
  );
}

export default Banner;
