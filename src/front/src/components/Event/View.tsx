import React, { FunctionComponent, useState } from 'react';
import { Jumbotron, Row, Col, Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Modal, ModalBody, ModalFooter, Alert } from 'reactstrap';
import { ProfileView } from '../Profile/Profile';
import { Event } from '../../services/event.service';
import { useHistory } from "react-router-dom";
import {useEvent} from './Hook';


const EventView: FunctionComponent<{ event: Event, format?: string }> = ({ event, format }) => {

  const [dropdownOpen, setOpen] = useState<boolean>(false);
  const [subscribedStatus, setSubscribedStatus] = useState<boolean>(event.isSubscribed);
  const [displayedSubscriberId, setDisplayedSubscriberId] = useState<number | null>(null);
  const [modal, setModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const history = useHistory();
  const {subscribeEvent,getEventSubscribers,subscribers,error,remove}= useEvent();

  const edit = function () {
    history.push("/event/edit/".concat(String(event.id)));
  }
  const removeConfirmation = function () {
    if(remove(event.id)){
      setDeleteModal(!deleteModal);
      //reload page
      history.go(0);
    }
  }
  
  const subscribe = function(subscribe:boolean){
    if(subscribeEvent(event.id,subscribe)){
      setSubscribedStatus(subscribe);
    }
  }


  const displaySubscriber = function (subscriberId: number | null) {
    setDisplayedSubscriberId(subscriberId);
    setModal(!modal);
  }

  const getSubscribers = function () {
    getEventSubscribers(event.id);
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
                    {subscribers.length > 0 ?  subscribers.map((subscriber) => {
                      return (<DropdownItem onClick={() => displaySubscriber(subscriber.id)}>{subscriber.userName}</DropdownItem>)
                    })
                      : <DropdownItem>Personne!</DropdownItem>
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
                {event.isOwner && <Button size="sm" color="warning" className="mr-3" onClick={() => edit()}>Modifier</Button>}
                {event.isOwner && <Button size="sm" color="danger" onClick={() => setDeleteModal(!deleteModal)}>Supprimer</Button>}
              </Col>
            </Row>
          </Jumbotron>
          <Modal isOpen={modal} toggle={() => displaySubscriber(null)}>
            <ModalBody>
              <ProfileView userId={displayedSubscriberId}></ProfileView>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={() => displaySubscriber(null)}>Fermer</Button>
            </ModalFooter>
          </Modal>
          <Modal isOpen={deleteModal}>
            <ModalBody>
              <p>Voulez vous réellement supprimer cet évènement?</p>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" onClick={() => removeConfirmation()}>Supprimer</Button>
              <Button color="secondary" onClick={() => setDeleteModal(!deleteModal)}>Annuler</Button>
            </ModalFooter>
          </Modal>
          {error && <Alert color="danger">{error.message}</Alert>}
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
                    {subscribers.length > 0 ?  subscribers.map((subscriber) => {
                      return (<DropdownItem onClick={() => displaySubscriber(subscriber.id)}>{subscriber.userName}</DropdownItem>)
                    })
                      : <DropdownItem>Personne!</DropdownItem>
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
                {event.isOwner && <Button size="sm" color="warning" className="mr-3" onClick={() => edit()}>Modifier</Button>}
                {event.isOwner && <Button size="sm" color="danger" onClick={() => setDeleteModal(!deleteModal)}>Supprimer</Button>}
              </Col>
            </Row>
          </Jumbotron>
          <Modal isOpen={modal} toggle={() => displaySubscriber(null)}>
            <ModalBody>
              <ProfileView userId={displayedSubscriberId}></ProfileView>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={() => displaySubscriber(null)}>Fermer</Button>
            </ModalFooter>
          </Modal>
          <Modal isOpen={deleteModal}>
            <ModalBody>
              <p>Voulez vous réellement supprimer cet évènement?</p>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" onClick={() => removeConfirmation()}>Supprimer</Button>
              <Button color="secondary" onClick={() => setDeleteModal(!deleteModal)}>Annuler</Button>
            </ModalFooter>
          </Modal>
          {error && <Alert color="danger">{error.message}</Alert>}
        </>
      )
  }

}


export default EventView;