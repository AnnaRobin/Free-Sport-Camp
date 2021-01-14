import React, { FunctionComponent, useEffect, useState } from 'react';
import Logout from './../Logout';
import UserHelper from '../UserHelper';
import Account from '../Account';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Container,
  Row,
  Col
} from 'reactstrap';

import logo from '../../assets/images/logo.png';
import logo_mobile from '../../assets/images/logo_mobile.png';


const Header: FunctionComponent<{}> = () => {



  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (UserHelper.isConnected()) {
      setUserName(UserHelper.getName());
    }
  }, [])


  return (
    <Container className="themed-container p-0" fluid={true}>

      <Navbar color="light" light expand="md">
        <NavbarBrand href="/">
          <img src={logo} alt="Logo Free Sport Camp" className="d-none d-sm-block logo" />
          <img src={logo_mobile} alt="Logo Free Sport Camp" className="d-block d-sm-none" />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar id="main_menu">

            <NavItem>
              <NavLink className="font-weight-bolder alert-link color='primary' pointer" href="/" >Notre mission</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="font-weight-bolder alert-link color='primary'pointer" href="/search" >Trouvez vos partenaires</NavLink>
            </NavItem>

            <NavItem>
              <NavLink className="font-weight-bolder alert-link color='primary' pointer" href="/ad">Publiez vos annonces</NavLink>
            </NavItem>

            <NavItem>
              <NavLink className="font-weight-bolder alert-link color='primary' pointer" href="/account" >Compte </NavLink>
            </NavItem>

            {!userName &&
              <NavItem>
                <NavLink className="font-weight-bolder alert-link color='primary' pointer" href="/connection">Connexion </NavLink>
              </NavItem>}
            {userName &&
            <NavItem>
              <NavLink className="font-weight-bolder alert-link color='primary' pointer" href="/activities">Mes Activités </NavLink>
            </NavItem>}
          </Nav>

          
          
          {/*<svg width="50px" height="50px" viewBox="0 0 16 16" className="bi bi-envelope-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555zM0 4.697v7.104l5.803-3.558L0 4.697zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757zm3.436-.586L16 11.801V4.697l-5.803 3.546z" />
            </svg>*/}
          
        </Collapse>
      </Navbar>
      {userName && <Account userName={userName}/>}
    </Container>





  );


};


export default Header;