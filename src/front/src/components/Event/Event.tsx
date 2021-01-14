import { get } from 'https';
import React, { FunctionComponent, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Jumbotron, Row, Col, Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import UserHelper from '../UserHelper'
import AjaxHelper from '../AjaxHelper';

interface Event {
  id: number;
  appointment: any;
  description: string;
  cityName: string;
  time: string;
  levelName: string;
  sportName: string;
  organizerUserName: string;
  organizerPhoneNumber: string;
  isSubscribed: boolean;
  isOwner: boolean;
}

const Event: FunctionComponent<{ event: Event }> = ({ event }) => {

  const [dropdownOpen, setOpen] = useState<boolean>(false);
  const[subscribedStatus,setSubscribedStatus] = useState<boolean>(event.isSubscribed);
  const[subscribers,setSubscribers] = useState<string[]|null>(null);

  const emptyList = "Personne!";

  const subscribe=function(eventId:number, subscribe:boolean){
    const url = subscribe?`http://localhost:8585/api/event/subscribe?eventId=${eventId}`:`http://localhost:8585/api/event/unsubscribe?eventId=${eventId}`;
    const method = subscribe?'POST':'POST';
    AjaxHelper.fetch(url,method,true,{})
    .then(function (response) {
      if (response.ok) {
        setSubscribedStatus(subscribe);
        var name = UserHelper.getName();
        
        
        if(name == null)
          return;

        //Dynamicaly add current user to subscribers list
        if(subscribe){
          var users : Array<string> = [];
          if (subscribers != null && subscribers[0] != emptyList){
            users = subscribers;
          }
          users.push(name);
          setSubscribers(users);
        }
        else{
          var users = subscribers || [];
          var index = users.indexOf(name);
          if(index>=0){
            users.splice(index,1);
            if(users.length == 0){
              users.push(emptyList);
            }
            setSubscribers(users);
          }
        }
      }
    })
  }

  const getSubscribers=function(eventId:number){
    if(subscribers==null){
      
      fetch(`http://localhost:8585/api/event/getSubscribers?eventId=${eventId}`, {
        method: 'GET',
        headers: {
                'Authorization': 'Bearer ' + UserHelper.getToken()
              }
      })
      .then(function (response){
        if(response.ok) {
          return response.json();
        }
      })
      .then(function(json){
        if(Array.isArray(json) && json.length > 0){
          setSubscribers(json);
        }
        else{
          //add empty information
          setSubscribers([emptyList]);
        }
        
      });
    }
    //toggle dropdown
    setOpen(!dropdownOpen);
  }
  
  return (
    <Jumbotron className="p-1 container shadow-lg p-3 mb-5 bg-white rounded np">

      <Row>
        <Col>
          <p>Organisateur : {event.organizerUserName}</p>
          <p>Téléphone : {event.organizerPhoneNumber}</p>
          <p>à savoir : {event.description}</p>
        </Col>
        <Col></Col>

        <Col>
          <p>Quand:{new Intl.DateTimeFormat('fr-FR').format(new Date(event.appointment))} {event.time}</p>
          <ButtonDropdown isOpen={dropdownOpen} toggle={()=>getSubscribers(event.id)}>
            <DropdownToggle caret size="sm">
              Participants
            </DropdownToggle>
           
            <DropdownMenu>
             {subscribers ? subscribers.map((subscriber) => {
            return (<DropdownItem>{subscriber}</DropdownItem>)
          })
            : ''
          }
           </DropdownMenu>
           
          </ButtonDropdown >

        </Col>
        <Col></Col>
        <Col>
          <p></p>
          <p></p>
          {!event.isOwner && subscribedStatus && <Button size="sm" onClick={()=>subscribe(event.id, false)}>Desinscription</Button>}
          {!event.isOwner && !subscribedStatus && <Button size="sm" onClick={()=>subscribe(event.id, true)}>Inscription</Button>}
          {event.isOwner && <Button size="sm" color="warning" className="mr-3">Modifier</Button>}
          {event.isOwner && <Button size="sm" color="danger">Supprimer</Button>}
        </Col>
      </Row>
    </Jumbotron>

  )
}


export default Event;