import React, { FunctionComponent, useState } from 'react';

import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    NavbarText
  } from 'reactstrap';

 import logo from '../../assets/images/logo.png';
 import logo_mobile from '../../assets/images/logo_mobile.png';


const Header: FunctionComponent<{}> = () => {
    
  
    
    const [isOpen, setIsOpen] = useState(false);
  
    const toggle = () => setIsOpen(!isOpen);
  
    return (
      <div>
        <Navbar color="light" light expand="md">
        <NavbarBrand href="/">
        <img src={logo} alt="Logo Free Sport Camp" className="d-none d-sm-block logo" />
        <img src={logo_mobile} alt="Logo Free Sport Camp" className="d-block d-sm-none" />
        </NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="mr-auto" navbar>
              <NavItem>
                <NavLink className="font-weight-bolder" href="#">Trouvez vos partenaires</NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="font-weight-bolder" href="#">Publiez vos annonces</NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="font-weight-bolder" href="#">Notre mission</NavLink>
              </NavItem>
              <NavItem>
                <NavLink className="font-weight-bolder" href="#">Connexion </NavLink>
              </NavItem>
             
            </Nav>
            <svg width="50px" height="50px" viewBox="0 0 16 16" className="bi bi-envelope-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555zM0 4.697v7.104l5.803-3.558L0 4.697zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757zm3.436-.586L16 11.801V4.697l-5.803 3.546z"/>
</svg>
          </Collapse>
        </Navbar>
      </div>
    );
     
    
  };
  

export default Header;