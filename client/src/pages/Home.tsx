import Navigationbar from '@/components/navigationbar';
import type { User } from '@/interfaces';
import React from 'react';

const Home:React.FC = () => {
  const testuser :User = {
    name : 'jon don',
    email: 'jondon@gmail.com',
    isadmin:false
  }
  return (
    <div>
      <Navigationbar user={testuser}/>
    </div>
  );
}

export default Home;
