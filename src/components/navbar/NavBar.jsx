import React from 'react';
import Burger from '../../components/ui/Burger/Burger';
import NavButtons from './navButtons/NavButtons';

const NavBar = () => {
  return (
    <>
      <NavButtons />
      <Burger />
    </>
  )
}

export default NavBar