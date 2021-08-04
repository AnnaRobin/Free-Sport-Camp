import React, { FunctionComponent, useEffect } from 'react';
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
              {profile.age && <p>Age : <strong> {profile.age}</strong></p>}
              {profile.sex && <p >Genre : <strong> {profile.sex === "MALE" && "Homme"}{profile.sex === "FEMALE" && "Femme"}</strong></p>}
              {profile.cityName && <p>Ville :  <strong>  {profile.cityName}</strong></p>}
              {profile.phoneNumber && <p>Téléphone : <strong> {profile.phoneNumber}</strong></p>}
              {!!!profile.presentation && !!!profile.age && !!!profile.sex && !!!profile.cityName && !!!profile.phoneNumber && <p className="text-center">Le profil n'est pas renseigné</p>}
              
              </>
           }

      </Jumbotron>
  );
}
