import React, { FunctionComponent, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Dropdown, DropdownToggle, DropdownMenu, FormGroup, Label, Input, Button, Tooltip } from 'reactstrap';
import { GrLanguage } from "react-icons/gr";
import { FaFacebook } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";

import { ImSearch } from "react-icons/im";

import UserHelper from '../../helpers/UserHelper';
import Account from '../Account';
import logo from '../../assets/images/logo.png';
import logo_mobile from '../../assets/images/logo_mobile.png';

import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Container, Row, Col } from 'reactstrap';

const Header: FunctionComponent<{}> = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [userName, setUserName] = useState<string | null>(null);
  const toggle = () => setIsOpen(!isOpen);

  useEffect(() => {
    if (UserHelper.isConnected()) {
      setUserName(UserHelper.getName());
    }
  }, [])


  /*   const Tooltip = (props: any) => {
     const [tooltipOpen, setTooltipOpen] = useState(false);
 
     const toggle = () => setTooltipOpen(!tooltipOpen);*/


  return (
    <>

      
         <DropdownMenu className="mt-3" id="account_menu">
    
        </DropdownMenu> 


      {/*  <DropdownToggle

         tag="span"
          data-toggle="dropdown"
          aria-expanded={toggleMenu}>
      
          
          </DropdownToggle>
         <NavLink  className="font-weight-bolder menu_color pointer" >Lister les utilisateurs</NavLink>
          <NavLink className="font-weight-bolder menu_color pointer" >Chercher un utilisateur</NavLink> 

*/}


       {/* <Container id="container" fluid={true}>
        <div className="container">
          <div className="row">
            <div className="col order-first">

              <svg stroke="currentColor" id="face" fill="currentColor" stroke-width="0" viewBox="0 0 512 512" height="35" width="35"
                xmlns="http://www.w3.org/2000/svg"><path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z">
                </path></svg>

              <svg stroke="currentColor" id="insta" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="40" width="40"
                xmlns="http://www.w3.org/2000/svg"><path d="M512 378.7c-73.4 0-133.3 59.9-133.3 133.3S438.6 645.3 512 645.3 645.3 585.4 645.3 512 585.4 378.7 512 378.7zM911.8 512c0-55.2.5-109.9-2.6-165-3.1-64-17.7-120.8-64.5-167.6-46.9-46.9-103.6-61.4-167.6-64.5-55.2-3.1-109.9-2.6-165-2.6-55.2 0-109.9-.5-165 2.6-64 3.1-120.8 17.7-167.6 64.5C132.6 226.3 118.1 283 115 347c-3.1 55.2-2.6 109.9-2.6 165s-.5 109.9 2.6 165c3.1 64 17.7 120.8 64.5 167.6 46.9 46.9 103.6 61.4 167.6 64.5 55.2 3.1 109.9 2.6 165 2.6 55.2 0 109.9.5 165-2.6 64-3.1 120.8-17.7 167.6-64.5 46.9-46.9 61.4-103.6 64.5-167.6 3.2-55.1 2.6-109.8 2.6-165zM512 717.1c-113.5 0-205.1-91.6-205.1-205.1S398.5 306.9 512 306.9 717.1 398.5 717.1 512 625.5 717.1 512 717.1zm213.5-370.7c-26.5 0-47.9-21.4-47.9-47.9s21.4-47.9 47.9-47.9 47.9 21.4 47.9 47.9a47.84 47.84 0 0 1-47.9 47.9z">
                </path></svg>
              <path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.28c-30.8 0-40.41 19.12-40.41 38.73V256h68.78l-11 71.69h-57.78V501C413.31 482.38 504 379.78 504 256z"></path>
            </div>
            <div className="col">
              <FormGroup>
                <Input
                  type="search" name="search" placeholder="Nom d'utilisateur" />
              </FormGroup>
            </div>
            <div className="col order-last">
              <svg stroke="currentColor" className="pointer" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="35" width="35"
                xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 16A8 8 0 108 0a8 8 0 000 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd">
                </path></svg>

              <svg stroke="currentColor" className="pointer" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="35" width="35"
                xmlns="http://www.w3.org/2000/svg"><path d="M8 16a2 2 0 002-2H6a2 2 0 002 2zm.995-14.901a1 1 0 10-1.99 0A5.002 5.002 0 003 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z">
                </path></svg>
              <svg stroke="currentColor" className="pointer" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="35" width="35"
                xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="#000" stroke-width="2" d="M12,23 C18.0751322,23 23,18.0751322 23,12 C23,5.92486775 18.0751322,1 12,1 C5.92486775,1 1,5.92486775 1,12 C1,18.0751322 5.92486775,23 12,23 Z M12,23 C15,23 16,18 16,12 C16,6 15,1 12,1 C9,1 8,6 8,12 C8,18 9,23 12,23 Z M2,16 L22,16 M2,8 L22,8">
                </path></svg>

            </div>
          </div>
        </div>∆
</Container> */}

      <Container className="themed-container p-0 bg-light" fluid={true}>
        <Row className="mr-0">
          <Col>
            <Navbar color="light" light expand="md">
              <NavbarBrand tag={Link} to="/">
                <img src={logo} alt="Logo Free Sport Camp" className="d-none d-sm-block logo" />
                <img src={logo_mobile} alt="Logo Free Sport Camp" className="d-block d-sm-none" />
              </NavbarBrand>
              <NavbarToggler onClick={toggle} />
              <Collapse isOpen={isOpen} navbar>
                <Nav className="mr-auto" navbar id="main_menu">
                  {!userName &&
                    <NavItem>
                      <NavLink tag={Link} className="font-weight-bolder alert-link color='primary' pointer" to="/" >Notre mission</NavLink>
                    </NavItem>
                  }
                  <NavItem>
                    <NavLink tag={Link} className="font-weight-bolder alert-link color='primary'pointer" to="/search" >Trouvez vos partenaires</NavLink>
                  </NavItem>

                  <NavItem>
                    <NavLink tag={Link} className="font-weight-bolder alert-link color='primary' pointer" to="/event/create">Publiez vos annonces</NavLink>
                  </NavItem>

                  {!userName &&
                    <NavItem>
                      <NavLink tag={Link} className="font-weight-bolder alert-link color='primary' pointer" to="/connection">Connexion </NavLink>
                    </NavItem>}
                  {userName &&
                    <>
                      <NavItem>
                        <NavLink tag={Link} className="font-weight-bolder alert-link color='primary' pointer" to="/activities">Mes Activités </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink tag={Link} className="font-weight-bolder alert-link color='primary' pointer" to="/publications">Mes Publications </NavLink>
                      </NavItem>
                      

                    </>}
                </Nav>

              {/*  <svg stroke="currentColor" className="pointer" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="35" width="35"
                  xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 16A8 8 0 108 0a8 8 0 000 16zm.93-9.412l-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM8 5.5a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd">
                  </path></svg>*/}


              </Collapse>
            </Navbar>
          </Col>
          {userName && <Col className="flex-fixed-width-item"><Account userName={userName} /></Col>}
        </Row>

      </Container>
    </>
  );
};


export default Header;