import React, { FunctionComponent, useEffect, useState } from 'react';
import { Button, Row, Col, Modal, ModalBody, ModalFooter, Alert } from 'reactstrap';
import useProfile from '../../components/Profile/Hook';
import {ProfileView} from '../../components/Profile/Profile';
import {useHistory} from 'react-router-dom';


export const View: FunctionComponent<{}> = () => {
    const history = useHistory();
    const [deleteModal, setDeleteModal] = useState(false);
    const {remove, error} = useProfile();
    const onClick = function(){
        history.push("/profile/edit");
    }
    const onRemove = function(){
        setDeleteModal(!deleteModal);
    }
    const removeProfile = function(){
        if(remove()){
            window.location.href = '/';
        }
        else{
            setDeleteModal(!deleteModal);
        }
    }
    return (
        <>
        <ProfileView/>
        {error && <Alert color="danger">{error.message}</Alert>}
        <Row>
            <Col className="text-center"><Button className="align-center" onClick={onClick}>Modifier</Button></Col>
            <Col className="text-center"><Button color="danger" onClick={onRemove}>Désactiver mon profil</Button></Col>
        </Row>
        <Modal isOpen={deleteModal}>
            <ModalBody>
              <p>Voulez vous réellement désactiver votre profil?</p>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" onClick={() => removeProfile()}>Supprimer</Button>
              <Button color="secondary" onClick={() => setDeleteModal(!deleteModal)}>Annuler</Button>
            </ModalFooter>
          </Modal>
        </>
    );

  }
  
