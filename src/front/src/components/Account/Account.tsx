
import React, { FunctionComponent, useState } from 'react';
import { Link } from 'react-router-dom';
import { Dropdown, DropdownToggle, DropdownMenu, NavLink, FormGroup, Label, Input, Button, Tooltip } from 'reactstrap';
import {BsSearch} from "react-icons/bs";
import Logout from '../Logout';

const Account: FunctionComponent<{ userName: string }> = ({ userName }) => {
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);

  const toggle = () => {
    setToggleMenu(!toggleMenu);
  }
  return (
   <>
  <FormGroup>
      
        <Input
          type="search" name="search" id="main_menu" placeholder="nom d'utilisateur"/>
         <Button><BsSearch/> </Button>
      </FormGroup>

            <Dropdown id="account" isOpen={toggleMenu} size="sm" toggle={toggle}>


<svg stroke="currentColor" className="pointer" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="25" width="25" 
xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 16A8 8 0 108 0a8 8 0 000 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd">
  </path></svg>
  
   
      
      <svg stroke="currentColor" className="pointer" fill="currentColor" stroke-width="0" viewBox="0 0 16 16"  height="48" width="48" 
      xmlns="http://www.w3.org/2000/svg"><path d="M8 16a2 2 0 002-2H6a2 2 0 002 2zm.995-14.901a1 1 0 10-1.99 0A5.002 5.002 0 003 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z">
        </path></svg>
        <DropdownToggle
          tag="span"
          data-toggle="dropdown"
          aria-expanded={toggleMenu}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" className="pointer" fill="currentColor" viewBox="0 0 16 16">
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
            <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
          </svg>
        </DropdownToggle>
        
        <DropdownMenu className="mt-3" id="account_menu">
          <NavLink id="main_menu" tag={Link} className="font-weight-bolder menu_color pointer" to="/profile" >Mon profil</NavLink>
          <NavLink tag={Link} className="font-weight-bolder menu_color pointer" to="/password" >Mot de passe</NavLink>
          <Logout className="font-weight-bolder nav-link pointer" text="Deconnexion" />
        </DropdownMenu>
        <span id="bonjour" className="ml-3">Bonjour {userName} !</span>
      </Dropdown>
    </>
  )
}
export default Account;