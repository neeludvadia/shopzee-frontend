import React from 'react';
import HeaderMenu from './HeaderMenu';
import Logo from './Logo';
import Container from './Container';
import MobileMenu from './MobileMenu';
import SearchBar from './SearchBar';
import CartIcon from './CartIcon';

const Header = () => {
  return (
    <div className='border-b border-b-gray-400 py-5 '>
      <Container className='flex items-center justify-between gap-7 text-lightColor'>
      <HeaderMenu/>
      <div className='w-auto md:w-1/3 flex items-center justify-center gap-2.5'>
      <MobileMenu/>
      <Logo>Shopzee</Logo>
      </div>
      <div className='w-auto md:w-1/3 flex items-center justify-center gap-5'>
      <SearchBar/>
      <CartIcon/>
      <div>
        <button className='text-sm font-semibold hover:text-darkColor hoverEffect'>Login</button>
      </div>
      </div>
      </Container>
    </div>
  );
}

export default Header;
