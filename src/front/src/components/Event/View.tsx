import React, { FunctionComponent, useState } from 'react';
import { Jumbotron, Row, Col, Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import {ProfileView} from '../Profile/Profile';
import UserHelper from '../../helpers/UserHelper'
import AjaxHelper from '../../helpers/AjaxHelper';
import {Event} from '../../services/event.service';
import { useHistory } from "react-router-dom";

interface subscriber {
  id: number;
  userName: string;
}





const EventView: FunctionComponent<{ event: Event, format?: string }> = ({ event, format }) => {

  const [dropdownOpen, setOpen] = useState<boolean>(false);
  const [subscribedStatus, setSubscribedStatus] = useState<boolean>(event.isSubscribed);
  const [subscribers, setSubscribers] = useState<subscriber[] | null>(null);
  const [displayedSubscriberId, setDisplayedSubscriberId] = useState<number | null>(null);
  const [modal, setModal] = useState(false);
  const history = useHistory();
  
  const emptyList = { id: 0, userName: "Personne!" };

  const edit = function(){
    history.push("/event/edit/".concat(String(event.id)));
  }
  const remove = function(){
    console.log('delete '.concat(String(event.id)));
  }

  const subscribe = function (subscribe: boolean) {
    const url = subscribe ? `http://localhost:8585/api/event/subscribe?eventId=${event.id}` : `http://localhost:8585/api/event/unsubscribe?eventId=${event.id}`;
    //FIXME
    const method = subscribe ? 'POST' : 'POST';
    AjaxHelper.fetch(url, method, true)
      .then(function (response) {
        if (response.ok) {
          setSubscribedStatus(subscribe);
          var name = UserHelper.getName();


          if (name == null)
            return;

          //Dynamicaly add current user to subscribers list
          if (subscribe) {
            var users: Array<subscriber> = [];
            if (subscribers != null && subscribers[0].userName !== emptyList.userName) {
              users = subscribers;
            }
            users.push({ id: -1, userName: name });
            setSubscribers(users);
          }
          else {
            var users = subscribers || [];
            //var index = users.indexOf({id:-1,userName:name});

            var index = -1;
            users.forEach(function (item: subscriber, key: number) {
              if (item.userName == name) {
                index = key;
              }
            });

            if (index >= 0) {
              //FIXME
              users.splice(index, 1);
              if (users.length == 0) {
                users.push(emptyList);
              }
              setSubscribers(users);
            }
          }
        }
      })
  }


  const displaySubscriber = function(subscriberId: number|null){
    setDisplayedSubscriberId(subscriberId);
    setModal(!modal);
  }

  const getSubscribers = function () {
    if (subscribers == null) {

      AjaxHelper.fetch(`http://localhost:8585/api/event/getSubscribers?eventId=${event.id}`,
        'GET',
        true
      )
        .then(function (response) {
          if (response.ok) {
            return response.json();
          }
        })
        .then(function (json) {
          if (Array.isArray(json) && json.length > 0) {
            setSubscribers(json);
            console.log(subscribers);
          }
          else {
            //add empty information
            setSubscribers([emptyList]);
          }

        });
    }
    //toggle dropdown
    setOpen(!dropdownOpen);
  }
  switch (format) {
    case 'subscribed':
      return (
        <>
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
              <p>Sport : {event.sportName}</p>
              <ButtonDropdown isOpen={dropdownOpen} toggle={() => getSubscribers()}>
                <DropdownToggle caret size="sm">
                  Participants
                </DropdownToggle>

                <DropdownMenu>
                  {subscribers ? subscribers.map((subscriber) => {
                    return (<DropdownItem onClick={()=>displaySubscriber(subscriber.id)}>{subscriber.userName}</DropdownItem>)
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
              {!event.isOwner && subscribedStatus && <Button size="sm" onClick={() => subscribe(false)}>Desinscription</Button>}
              {!event.isOwner && !subscribedStatus && <Button size="sm" onClick={() => subscribe(true)}>Inscription</Button>}
              {event.isOwner && <Button size="sm" color="warning" className="mr-3" onClick={()=>edit()}>Modifier</Button>}
              {event.isOwner && <Button size="sm" color="danger" onClick={()=>remove()}>Supprimer</Button>}
            </Col>
          </Row>
        </Jumbotron>
        <Modal isOpen={modal} toggle={()=>displaySubscriber(null)}>
            <ModalBody>
              <ProfileView userId={displayedSubscriberId}></ProfileView>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={()=>displaySubscriber(null)}>Fermer</Button>
            </ModalFooter>
          </Modal>
        </>
      )
    default:
      return (
        <>
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
              <ButtonDropdown isOpen={dropdownOpen} toggle={() => getSubscribers()}>
                <DropdownToggle caret size="sm">
                  Participants
                </DropdownToggle>

                <DropdownMenu>
                  {subscribers ? subscribers.map((subscriber) => {
                    return (<DropdownItem onClick={()=>displaySubscriber(subscriber.id)}>{subscriber.userName}</DropdownItem>)
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
              {!event.isOwner && subscribedStatus && <Button size="sm" onClick={() => subscribe(false)}>Desinscription</Button>}
              {!event.isOwner && !subscribedStatus && <Button size="sm" onClick={() => subscribe(true)}>Inscription</Button>}
              {event.isOwner && <Button size="sm" color="warning" className="mr-3" onClick={()=>edit()}>Modifier</Button>}
              {event.isOwner && <Button size="sm" color="danger" onClick={()=>remove()}>Supprimer</Button>}
            </Col>
          </Row>
        </Jumbotron>
        <Modal isOpen={modal} toggle={()=>displaySubscriber(null)}>
            <ModalBody>
            <ProfileView userId={displayedSubscriberId}></ProfileView>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={()=>displaySubscriber(null)}>Fermer</Button>
            </ModalFooter>
          </Modal>
        </>
      )
  }

}


export default EventView;