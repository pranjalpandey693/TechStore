import React from 'react';
import Carousel from './component/carousel';
import {offers}  from '@/constant/images';

const Home = () => {
  return (
    <div>
      <Carousel offers={offers} />
    </div>
  );
}

export default Home;
