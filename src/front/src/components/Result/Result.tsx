import React,  { FunctionComponent, useState}  from 'react';
import { Jumbotron,Container,Row,Col,Button, ButtonDropdown, DropdownToggle  } from 'reactstrap';

interface Event {
    id : number;
    appointment : any;
    description : string;
    cityName : string;
    timeName : string;
    levelName : string;
    sportName : string;
    organizerUserName : string;
    organizerPhoneNumber : string;
  }

  const Result: FunctionComponent<{event:Event}> = ({event}) =>{

    const [dropdownOpen, setOpen] = useState(false);

    const toggle = () => setOpen(!dropdownOpen);
      return (
          <Jumbotron className="p-1 container shadow-lg p-3 mb-5 bg-white rounded np">


  <Row>
    <Col className="col">
            <p>Organisateur:{event.organizerUserName}</p>
            <p>Téléphone:{event.organizerPhoneNumber}</p>    
            <p>à savoir:{event.description}</p>    
    </Col>       
    <Col className="w-100"></Col>

    <Col className="col">
            <p>Quand:{new Intl.DateTimeFormat('fr-FR').format(new Date(event.appointment))}</p>
            <ButtonDropdown isOpen={dropdownOpen} ontoggle={ontoggle}>
           <DropdownToggle caret size="sm">
             Participants
            </DropdownToggle>
            </ButtonDropdown >
           
    </Col>
    <Col className="w-100"></Col>
    <Col className="col">
      <p></p>
      <p></p>
    <Button size="sm">Inscription</Button>
    </Col>
  </Row>   
          </Jumbotron>
          
      )
  }


export default Result;