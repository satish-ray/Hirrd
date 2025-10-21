import React from 'react'
import { Link } from 'react-router-dom';
import { Drawer } from './ui/drawer';
import { Button } from './ui/button';
// import Button from "./ui/button"
// This is likely what you have now
// import Button from '/src/components/ui/button.jsx';

const Header = () => {
  return (
    <>
    <nav className='py-4 flex justify-between items-center'>
        <Link>
        <img src="logo.png" className='h-20' alt="logo" />
        </Link>

        <Button variant="outline">Login</Button>
    </nav>
    </>
      
 
  )
}

export default Header;
