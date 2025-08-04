
import Carousel from './component/carousel';
import {offers}  from '@/constant/images';
import ProductSection from './ProductSection';

const Home = () => {
  return (
    <div>
      <Carousel offers={offers} />
      <ProductSection/>
    </div>
  );
}

export default Home;
