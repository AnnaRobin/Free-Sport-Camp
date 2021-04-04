import React, { FunctionComponent, useState, useEffect } from 'react';
import { Jumbotron} from 'reactstrap';
import useProfile from './Hook';

export const ProfileView: FunctionComponent<{ userId?: number | null}> = ({userId}) => {
  const {getPublic,get, profile} = useProfile();
  useEffect(() => {
    if(userId){
      getPublic(userId);
    }
    else{
      get();
    }
    
  },[]);  
  return (
      <Jumbotron fluid className="container shadow-lg p-3 mb-5 bg-white rounded np mt-3" id="resultContainer">
       
      {profile
           && <>
              <h1 className="text-center">{profile.userName}</h1><br/><br/><br/>
              <p>{profile.presentation}</p>
              {profile.age && <p><strong>Age : </strong> {profile.age}</p>}
              {profile.sex && <p ><strong>Genre : </strong> {profile.sex == "MALE" && "Homme"}{profile.sex == "FEMALE" && "Femme"}</p>}
              {profile.cityName && <p><strong>Ville :  </strong>  {profile.cityName}</p>}
              {profile.phoneNumber && <p><strong>Téléphone : </strong> {profile.phoneNumber}</p>}
              {!!!profile.presentation && !!!profile.age && !!!profile.sex && !!!profile.cityName && !!!profile.phoneNumber && <p className="text-center">Le profil n'est pas renseigné</p>}
              
              </>
           }

      </Jumbotron>
  );
}
