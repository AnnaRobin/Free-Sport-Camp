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
          <Jumbotron className="p-1 container">


  <div className="row">
    <div className="col">
            <p>Organisateur:{event.organizerUserName}</p>
            
    </div>
    <div className="col">
    <p>Téléphone:{event.organizerPhoneNumber}</p>
             
    </div>
    <div className="col">
            
    </div>
    <div className="w-100"></div>
    <div className="col">
    <p>Quand:{new Intl.DateTimeFormat('fr-FR').format(new Date(event.appointment))} {event.timeName}</p>
    </div>
    <div className="col">
     <ButtonDropdown isOpen={dropdownOpen} ontoggle={ontoggle}>
      <DropdownToggle caret size="sm">
        Participants
      </DropdownToggle>
      </ButtonDropdown >
    </div>
    <div className="col">
    <Button size="sm">S'inscrire</Button>
    </div>
    <div className="w-100"></div>
    <div className="col">
    <p>à savoir:{event.description}</p>
    </div>
    <div className="col">
             
    </div>
    <div className="col">
             
    </div>
  </div>


              
                {/* <Row>
                    <Col className="col-5">
                        <p>Organisateur:{event.organizerUserName}</p>
                        <p>Quand:{event.appointment}</p>
                    </Col>
                    <Col className="col-5">
                        <p>Téléphone:{event.organizerPhoneNumber}</p>
                        <p>à savoir:{event.description}</p>
                    </Col>
                    <Col className="col-2 text-right">
                        <Button>S'inscrire</Button>
                    </Col>
                </Row> */}


              
          </Jumbotron>
          
      )
  }


export default Result;