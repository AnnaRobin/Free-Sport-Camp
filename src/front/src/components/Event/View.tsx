import React, { FunctionComponent, useState, useEffect } from 'react';
import { Jumbotron, Row, Col, Button, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem, Modal, ModalBody, ModalFooter, Alert } from 'reactstrap';
import { useHistory } from "react-router-dom";
import { ProfileView } from '../Profile/Profile';
import { Event } from '../../services/Event';
import { useEvent } from './Hook';

const EventView: FunctionComponent<{ event: Event }> = ({ event }) => {

  const [dropdownOpen, setOpen] = useState<boolean>(false);
  const [subscribedStatus, setSubscribedStatus] = useState<boolean>(event.isSubscribed);
  const [displayedSubscriberId, setDisplayedSubscriberId] = useState<number | null>(null);
  const [modal, setModal] = useState(false);
  const [descriptionModal, setDescriptionModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [isEditable, setIsEditable] = useState<boolean>(true);
  const history = useHistory();
  const { subscribeEvent, getEventSubscribers, subscribers, error, remove } = useEvent();

  useEffect(() => {
    setIsEditable(new Date(event.appointment).getTime() > new Date().getTime());
  }, [])

  const edit = function () {
    history.push("/event/edit/".concat(String(event.id)));
  }
  const removeConfirmation = function () {
    if (remove(event.id)) {
      setDeleteModal(!deleteModal);
      //reload page
      history.go(0);
    }
  }
  const subscribe = function (subscribe: boolean) {
    if (subscribeEvent(event.id, subscribe)) {
      setSubscribedStatus(subscribe);
    }
  }
  const displaySubscriber = function (subscriberId: number | null) {
    setDisplayedSubscriberId(subscriberId);
    setModal(!modal);
  }
  const displayDescription = function () {
    setDescriptionModal(!descriptionModal);
  }
  const getSubscribers = function () {
    getEventSubscribers(event.id);
    //toggle dropdown
    setOpen(!dropdownOpen);
  }
  return (
    <>
      <Jumbotron className="p-1 container shadow-lg p-3 mb-5 bg-white rounded np">
        <Row>
          <Col xs="6" sm="5">
            <p className="pointer" onClick={() => displaySubscriber(event.organizerId)}><strong>Organisateur :</strong> {event.organizerUserName}</p>
            <p><strong>Téléphone : </strong>{event.organizerPhoneNumber}</p>
            <p className="pointer" onClick={() => displayDescription()}><strong>À savoir : </strong> {event.description.slice(0, 15)}</p>
          </Col>
          <Col xs="6" sm="5">
            <p><strong>Quand : </strong> {new Intl.DateTimeFormat('fr-FR').format(new Date(event.appointment))} {event.time.slice(0, 5)}</p>
            <p><strong>Sport : </strong>{event.sportName}</p>
            <ButtonDropdown isOpen={dropdownOpen} toggle={() => getSubscribers()}>
              <DropdownToggle caret size="sm">
                Participants
                </DropdownToggle>
              <DropdownMenu>
                {subscribers.length > 0 ? subscribers.map((subscriber) => {
                  return (<DropdownItem onClick={() => displaySubscriber(subscriber.id)}>{subscriber.userName}</DropdownItem>)
                })
                  : <DropdownItem>Personne</DropdownItem>
                }
              </DropdownMenu>
            </ButtonDropdown >
          </Col>
          <Col xs="12" sm="2">
            <p></p>
            <p></p>
            {isEditable && !event.isOwner && subscribedStatus && <Button size="sm" color="dark" className=" container shadow-lg p-2 mb-2 bg-white rounded btn-txt-color" onClick={() => subscribe(false)}>Desinscription</Button>}
            {isEditable && !event.isOwner && !subscribedStatus && <Button size="sm" color="dark" className=" container shadow-lg p-2 mb-2 bg-white rounded btn-txt-color" onClick={() => subscribe(true)}>Inscription</Button>}
            {isEditable && event.isOwner && <Button color="warning" className=" container shadow-lg p-2 mb-2 bg-white rounded btn-txt-color" onClick={() => edit()}>Modifier</Button>}
            {isEditable && event.isOwner && <Button size="sm" color="danger" className=" container shadow-lg p-2 mb-2 bg-white rounded btn-txt-color" onClick={() => setDeleteModal(!deleteModal)}>Supprimer</Button>}
          </Col>
        </Row>
      </Jumbotron>
      <Modal isOpen={modal} toggle={() => displaySubscriber(null)}>
        <ModalBody>
          <ProfileView userId={displayedSubscriberId}></ProfileView>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => displaySubscriber(null)}>Fermer</Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={descriptionModal} >
        <ModalBody>
          {event.description}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => displayDescription()}>Fermer</Button>
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
export default EventView;