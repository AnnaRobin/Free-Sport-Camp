import React, { FunctionComponent, useState } from "react";
import { Button, Modal, ModalBody, ModalFooter} from "reactstrap";
import { useHistory } from "react-router-dom";

import { ProfileToAdmin } from "../../services/Admin";
import { ProfileView } from '../Profile/Profile';
import useProfileToAdmin from "../Admin/Hook";
 
const ProfileViewToAdmin: FunctionComponent<{ profile: ProfileToAdmin, handleDelete: any }> = ({ profile, handleDelete }) => {
    const [deleteModal, setDeleteModal] = useState(false);
    const [modal, setModal] = useState(false);
    const [displayedSubscriberId, setDisplayUserId] = useState<number | null>(null);

    const history = useHistory();


    const { removeAnybody } = useProfileToAdmin();

    const removeConfirmation = async function () {
        if (await removeAnybody(profile.id)) {
            setDeleteModal(!deleteModal);
            //reload page 
            handleDelete();
           // history.go(0);
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
