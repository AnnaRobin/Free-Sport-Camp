import React, { FunctionComponent, useState } from 'react';
import { Button, Container, Row, Col, Modal, ModalBody, ModalFooter, Alert } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import useProfile from '../../components/Profile/Hook';
import { ProfileView } from '../../components/Profile/Profile';

export const View: FunctionComponent<{}> = () => {
    const history = useHistory();
    const [deleteModal, setDeleteModal] = useState(false);
    const { remove, error } = useProfile();
    const onClick = function () {
        history.push("/profile/edit");
    }
    const onRemove = function () {
        setDeleteModal(!deleteModal);
    }
    const removeProfile = function () {
        if (remove()) {
            window.location.href = '/';
        }
        else {
            setDeleteModal(!deleteModal);
        }
    }
    return (
        <>
            <ProfileView />
            {error && <Alert color="danger">{error.message}</Alert>}
            <Container className="mb-5">
                <Row>
                    <Col className="text-center align-centershadow-lg"><Button color="warning" className="shadow-lg p-2 mb-2 bg-white rounded btn-txt-color" onClick={onClick}>Modifier mon profil</Button></Col>
                    <Col className="text-center"><Button color="danger" className="shadow-lg p-2 mb-2 bg-white rounded btn-txt-color" onClick={onRemove}>Désactiver mon compte</Button></Col>
                </Row>
            </Container>
            <Modal isOpen={deleteModal}>
                <ModalBody>
                    <p>Voulez vous réellement désactiver votre profil?</p>
                    <p>Votre compte sera supprimé le premier jour du mois suivant. Si vous voulez le réactiver avant, veuillez contacter l'administrateur.</p>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" className=" shadow-lg bg-white rounded btn-txt-color" onClick={() => removeProfile()}>Supprimer</Button>
                    <Button color="secondary" className=" shadow-lg bg-white rounded btn-txt-color" onClick={() => setDeleteModal(!deleteModal)}>Annuler</Button>
                </ModalFooter>
            </Modal>
        </>
    );
}

