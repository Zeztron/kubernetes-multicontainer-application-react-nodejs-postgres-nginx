import React from 'react';
import { Link } from 'react-router-dom';

const OtherPage = () => {
  return (
    <div>
      I'm an other page!
      <br />
      <br />
      <Link to="/">Go to home screen</Link>
    </div>
  );
};

export default OtherPage;
