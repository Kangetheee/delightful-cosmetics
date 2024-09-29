import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg';
import { NavBar } from './NavBar';
import { MdClose, MdMenu } from 'react-icons/md';
import { FaBasketShopping } from 'react-icons/fa6';
import { ShopContext } from '../context/ShopContext';

export function Header({ setShowLogin }) {  // Accept setShowLogin as a prop
  const [menuOpened, setMenuOpened] = useState(false);
  const toggleMenu = () => setMenuOpened(!menuOpened);
  const { getTotalCartAmount } = useContext(ShopContext)

  return (
    <header className='fixed w-full z-20'>
      <div className='max-padd-container flex justify-between items-center py-4'>
        
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="delight-logo" className="h-20 w-20" />
        </Link>

        {/* Navbar */}
        <NavBar containerStyles="hidden md:flex" />

        {/* Right side: Cart and Login Button */}
        <div className='flex items-center gap-x-6'>
          <Link to="/cart" className="flex items-center">
            <FaBasketShopping className="text-[22px]" />
            <span className={getTotalCartAmount()> 0 ? 'relative flexCenter w-2 h-2 rounded-full bg-secondary text-white medium-14 -top-1': 'w-2 h-2 rounded-full bg-transparent'}></span>
          </Link>
          <button 
            onClick={() => setShowLogin(true)}  // Trigger the login popup
            className='btn-outline rounded-full hidden md:inline-block'>
            Login
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className='md:hidden flex items-center'>
          {!menuOpened ? (
            <MdMenu className="text-2xl cursor-pointer" onClick={toggleMenu} />
          ) : (
            <MdClose className="text-2xl cursor-pointer" onClick={toggleMenu} />
          )}
        </div>

        {/* Mobile Navbar */}
        {menuOpened && (
          <div className='fixed top-16 right-0 left-0 bg-white p-4 shadow-md flex flex-col space-y-4'>
            <NavBar containerStyles="flex flex-col space-y-4" />
            <Link to="/cart" className="flex items-center justify-center">
              <FaBasketShopping className="text-[22px]" />
              <span className={getTotalCartAmount()> 0 ? 'relative flexCenter w-2 h-2 rounded-full bg-secondary text-white medium-14 -top-1': 'w-2 h-2 rounded-full bg-transparent'}></span>
            </Link>
            <button 
              onClick={() => setShowLogin(true)}  // Trigger the login popup for mobile
              className='btn-outline rounded-full'>
              Login
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
