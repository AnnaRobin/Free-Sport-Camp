import React, { FunctionComponent, useEffect } from 'react';
import { Table, Jumbotron } from 'reactstrap';
import { RiDeleteBin5Fill } from 'react-icons/ri';


import Paging from '../../components/Paging';
//import { useUsers } from '../../components/Admin/ListOfUsers';
import ProfileViewToAdmin from '../../components/Admin/ProfileViewToAdmin';
import  useProfileToAdmin  from '../../components/Admin/Hook';


const List: FunctionComponent<{}> = () => {
  const { getAllUsers, profiles, total, currentPage, error } = useProfileToAdmin();
  const pageSize = 20;

  useEffect(() => {
    getAllUsers(0, pageSize);
  }, [])
  return (
    <>
      <Table striped fluid className="alert-light results container" id="resultContainer">
        <thead id="tablehead">
          <tr>
            <th>Nom complète</th>
            <th>Nom d'utilisateur</th>
            <th>Telephone</th>
            <th>Email</th>
            <th></th>
          </tr>
        </thead>
        <tbody id="resultContainer">

          {profiles.length ? profiles.map((profile) => {
            return (<ProfileViewToAdmin key={profile.id} profile={profile}  handleDelete={() => { getAllUsers(currentPage, pageSize);}}/>)
          }) :
            <h2 id="defaultMessage">{error}</h2>
          }
        </tbody>
      </Table>
      <Paging totalCount={total} pageSize={pageSize} currentPage={currentPage} handleClick={(pageNumber: number) => { getAllUsers(pageNumber, pageSize); }} scrollTo="#resultContainer" />
    </>
  );

}


export default List;