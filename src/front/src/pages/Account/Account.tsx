import React, { FunctionComponent} from 'react';
import { Container, Nav, NavItem, NavLink } from 'reactstrap';

// import { Navbar, Toast, ToastBody, } from 'reactstrap';








const Account: FunctionComponent<{}> = () => {

  


  return (
    <Container id="sub_menu">
      <Nav className="">
    
          <NavItem className="navborder font-weight-bolder alert-link color='primary'">
            <NavLink href="">Mes activités</NavLink>
          </NavItem>
          <NavItem className="navborder font-weight-bolder alert-link color='primary'">
            <NavLink href="">Mes annonces</NavLink>
          </NavItem>
          <NavItem className="navborder font-weight-bolder alert-link color='primary'">
              <NavLink href="">Mon profil</NavLink>
            </NavItem>

            <NavItem className="navborder font-weight-bolder alert-link color='primary'">
              <NavLink href="">Editer mon profil </NavLink>
            </NavItem>

            <NavItem className="navborder font-weight-bolder alert-link color='primary'">
              <NavLink href="">Mot de passe</NavLink>
            </NavItem>

            <NavItem className="navborder font-weight-bolder alert-link color='primary'">
              <NavLink href="">Désactiver mon profil </NavLink>
            </NavItem>


      

      </Nav>




    </Container>

    // <Container className="className=".nav .flex-column">

    //   <Navbar color="light" light expand="md">
    //     <NavbarToggler onClick={toggle} />
    //     <Collapse isOpen={isOpen} navbar>
    //       <Nav className="mr-auto" navbar id="main_menu">

    //         <NavItem>
    //           <NavLink className="font-weight-bolder alert-link color='primary'" href="/" >Notre mission</NavLink>
    //         </NavItem>
    //         <NavItem>
    //           <NavLink className="font-weight-bolder alert-link color='primary'" href="/search" >Trouvez vos partenaires</NavLink>
    //         </NavItem>
    //         </Collapse>
    //         </Navbar>
    // </Container>















    // <div id="sub_menu" className=".nav .flex-column">
    //   <div className="p-3 my-2 rounded">
    //     <Toast>
    //       <ToastBody>
    //         <button type="button" className="font-weight-bolder list-group-item list-group-item-action text-center">Mes activités</button>
    //       </ToastBody>
    //     </Toast>
    //   </div>
    //   <div className="p-3 my-2 rounded">
    //     <Toast>
    //       <ToastBody>
    //         <button type="button" className="font-weight-bolder list-group-item list-group-item-action text-center">Mes annonces</button>
    //       </ToastBody>
    //     </Toast>
    //   </div>
    //   <div className="p-3 my-2 rounded">
    //     <Toast>
    //       <ToastBody>
    //         <button type="button" className="font-weight-bolder list-group-item list-group-item-action text-center">Mon profil</button>
    //       </ToastBody>
    //     </Toast>
    //   </div>
    //   <div className="p-3 my-2 rounded">
    //     <Toast>
    //       <ToastBody>
    //         <button type="button" className="font-weight-bolder list-group-item list-group-item-action text-center">Editer mon profil</button>
    //       </ToastBody>
    //     </Toast>
    //   </div>
    //   <div className="p-3 my-2 rounded">
    //     <Toast>
    //       <ToastBody>
    //         <button type="button" className="font-weight-bolder list-group-item list-group-item-action text-center">Mot de passe</button>
    //       </ToastBody>
    //     </Toast>
    //   </div>
    //   <div className="p-3 my-2 rounded">
    //     <Toast>
    //       <ToastBody>
    //         <button type="button" className="font-weight-bolder list-group-item list-group-item-action text-center">Désactiver mon profil</button>
    //       </ToastBody>
    //     </Toast>
    //   </div>
    // </div>

  )
};





export default Account;