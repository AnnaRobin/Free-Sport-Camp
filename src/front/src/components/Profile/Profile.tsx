import React, { FunctionComponent, useState, useEffect } from 'react';
import { Jumbotron} from 'reactstrap';
import {Profile, ProfileService} from '../../services/profile.service';


export default function useProfile(){
    const [profile, setProfile] = useState<Profile|null>(null);
    const profileService = new ProfileService();

    async function _get(userId?: number): Promise<void>{
      const results = await profileService.get(userId);
      setProfile(results);
    }

    return {
        get: ()=>_get(),
        getPublic: (userId:number) => _get(userId),
        profile
    }
}



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
              <p>{profile.cityName}</p>
              <p>{profile.phoneNumber}</p>
              </>
           }

      </Jumbotron>
  );
}
