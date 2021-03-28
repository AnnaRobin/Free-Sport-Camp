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
      <Jumbotron>
      {profile
           && <>
              <h1 className="text-center">{profile.userName}</h1>
              <p>{profile.presentation}</p>
              {profile.age && <p>Age:{profile.age}</p>}
              <p>Genre:{profile.sex == "MALE" && "Homme"}{profile.sex == "FEMALE" && "Femme"}</p>
              <p>Ville:{profile.cityName}</p>
              {profile.phoneNumber && <p>Téléphone:{profile.phoneNumber}</p>}
              </>
           }

      </Jumbotron>
  );
}
