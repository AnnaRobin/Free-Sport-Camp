import React, { FunctionComponent, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ProfileView } from '../../components/Profile/Profile';


type ProfileParams = {
    userId: string;
  };

export const Public: FunctionComponent<{}> = () => {
    const params = useParams<ProfileParams>();
     
    return (
        <ProfileView userId={Number(params.userId)}/>
    );
  }
  
