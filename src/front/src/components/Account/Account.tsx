
import React, { FunctionComponent, useState } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, DropdownToggle, DropdownMenu, NavLink } from 'reactstrap';
import Logout from '../Logout';

const Account: FunctionComponent<{userName : string}> = ({userName}) => {
  const [toggleMenu,setToggleMenu] = useState<boolean>(false);

  const toggle = () => {
      setToggleMenu(!toggleMenu);
  }
  return (
    <>

        <Dropdown id="account" isOpen={toggleMenu} size="sm" toggle={toggle}>
        <DropdownToggle
            tag="span"
            data-toggle="dropdown"
            aria-expanded={toggleMenu}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" className="pointer" fill="currentColor" viewBox="0 0 16 16">
        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
        <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
        </svg>
      </DropdownToggle>
            <DropdownMenu className="mt-3" id="account_menu">
            
                <NavLink tag={Link} className="font-weight-bolder alert-link color='primary' menu_color pointer" to="/profile" >Mon profil</NavLink>

                <NavLink tag={Link} className="font-weight-bolder alert-link color='primary' menu_color pointer" to="/password" >Mot de passe</NavLink>
                <Logout className="font-weight-bolder alert-link color='primary' nav-link pointer" text="Deconnexion" />
            </DropdownMenu>
            <span id="bonjour" className="ml-3">Bonjour {userName} !</span>  
        </Dropdown>
                  
    </>
  )
}


export default Account;