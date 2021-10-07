
import React, { FunctionComponent, useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, Table } from "reactstrap";
import { useHistory } from "react-router-dom";


import { ProfileToAdmin } from "../../services/Profile";
import { ProfileView } from '../Profile/Profile';

import useProfile from "./Hook";

const ProfileViewToAdmin: FunctionComponent<{ profile: ProfileToAdmin }> = ({ profile }) => {
    const [deleteModal, setDeleteModal] = useState(false);
    const [modal, setModal] = useState(false);
    const [displayedSubscriberId, setDisplayUserId] = useState<number | null>(null);


    const history = useHistory();


    const { remove } = useProfile();

    const removeConfirmation = function () {
        if (remove()) {
            setDeleteModal(!deleteModal);
            //reload page 
            history.go(0);
        }
    }

    const displayUser = function (subscriberId: number | null) {
        setDisplayUserId(subscriberId);
        setModal(!modal);
    }

    return (
        <>
            <tr>
                <td className="pointer" onClick={() => displayUser(profile.id)}><strong> {profile.fullName}</strong></td>
                <td>{profile.userName}</td>
                <td>{profile.phoneNumber}</td>
                <td>{profile.email}</td>
                <td>{<Button size="sm" color="danger" className=" container shadow-lg p-2 mb-2 bg-white rounded btn-txt-color" onClick={() => setDeleteModal(!deleteModal)}>Supprimer</Button>}
                </td>
            </tr>

            <Modal isOpen={modal} toggle={() => displayUser(null)}>
                <ModalBody>
                    <ProfileView userId={displayedSubscriberId}></ProfileView>
                </ModalBody>
                <ModalFooter>
                    <Button color="secondary" className=" shadow-lg bg-white rounded btn-txt-color" onClick={() => displayUser(null)}>Fermer</Button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={deleteModal}>
                <ModalBody>
                    <p>Voulez vous réellement supprimer cet utilisateur?</p>
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" className=" shadow-lg bg-white rounded btn-txt-color" onClick={() => removeConfirmation()}>Supprimer</Button>
                    <Button color="secondary" className=" shadow-lg bg-white rounded btn-txt-color" onClick={() => setDeleteModal(!deleteModal)}>Annuler</Button>
                </ModalFooter>
            </Modal>
        </>
    )
}
export default ProfileViewToAdmin;
