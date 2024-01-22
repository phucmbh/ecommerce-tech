import React from 'react';
import { Outlet } from 'react-router-dom';
import {
  Footer,
  Header,
  Navigation,
  HeaderTop,
  FooterTop,
} from '../../components';

function Public() {
  return (
    <div className="w-full flex flex-col items-center">
      <HeaderTop />
      <Header />
      <Navigation />
      <div className="w-full">
        <Outlet />
      </div>
      <FooterTop />
      <Footer />
    </div>
  );
}

export default Public;
