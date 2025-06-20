import React from 'react'
import Header from '../components/Header';

const Home = () => {
  console.log("Home component rendered");
  // This will log every time the Home component is rendered
  return (
    <div>
      <Header />
    </div>
  )
}

export default Home