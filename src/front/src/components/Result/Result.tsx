import React,  { FunctionComponent}  from 'react';
import { Jumbotron,Container,Row,Col,Button } from 'reactstrap';

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
      return (
          <Jumbotron className="p-1">
              
                <Row>
                    <Col className="col-5">
                        <p>Organisateur:{event.organizerUserName}</p>
                        <p>Quand:{event.appointment} {event.timeName}</p>
                    </Col>
                    <Col className="col-5">
                        <p>Téléphone:{event.organizerPhoneNumber}</p>
                        <p>à savoir:{event.description}</p>
                    </Col>
                    <Col className="col-2 text-right">
                        <Button>S'inscrire</Button>
                    </Col>
                </Row>


              
          </Jumbotron>
          
      )
  }


export default Result;