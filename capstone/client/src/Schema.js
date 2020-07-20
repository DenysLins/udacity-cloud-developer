import React from 'react';
import picture from './picture.png'

export default () => {
  return (
    <div>
      <p>This sample project calculates Fibonacci sequence using recursive inefficient method. This allow us to use multiples workers in parallel to calculate such number.</p>
      <p>We also use Redis as cache to save recent calculated numbers, as well as a Postgres database to persist the calculated numbers.</p>
      <p>The client delivers the frontend, while the server is the backend API.</p>
      <img src={picture} alt="schema" />
    </div>
  );
};
