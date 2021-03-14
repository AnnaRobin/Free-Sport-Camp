import React, { FunctionComponent, useEffect } from 'react';
import { Button, Row, Col } from 'reactstrap';
import useProfile from '../../components/Profile';
import {ProfileView} from '../../components/Profile/Profile';
import {useHistory} from 'react-router-dom';


export const View: FunctionComponent<{}> = () => {
    const history = useHistory();

    const onClick = function(){
        history.push("/profile/edit");
    }
    return (
        <>
        <ProfileView/>
        <Row>
            <Col className="text-center"><Button className="align-center" onClick={onClick}>Modifier</Button></Col>
            <Col className="text-center"><Button color="danger">Supprimer</Button></Col>
        </Row>
        
        </>
    );
/*
    const {get, profile} = useProfile();
    useEffect(() => {
        get();
    },[]);  
    return (
        <Jumbotron>
        {profile
             && <>
                <h1 className="text-center">{profile.userName}</h1>
                <p>{profile.presentation}</p>
                <p>Ville : {profile.cityName}</p>
                <p>Téléphone : {profile.phoneNumber}</p>
                </>
             }

        </Jumbotron>
    );
    */
  }
  
