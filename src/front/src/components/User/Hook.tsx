import React, { useState } from 'react';
import {UserService,Credentials,User, PasswordUpdate} from '../../services/User';

export function useUserManagement(){
    const [error, setError] = useState<string|undefined>(undefined);
    const [token, setToken] = useState<string|undefined>(undefined);
    const userService = new UserService();
    async function _getAccessToken(credentials:Credentials):Promise<string|null>{
      try{
        const response = await userService.getAccessToken(credentials);
        return response.access_token;
      }
      catch(err){
        setError(err.message);
        return null;
      }
    }
    async function _createUser(userDatas:User):Promise<Boolean>{
        try{
            const response = await userService.create(userDatas);
            return true;
        }
        catch(err){
            setError(err.message);
            return false;
        }
    }
    async function _updatePassword(datas:PasswordUpdate):Promise<Boolean>{
      try{
        const response = await userService.updatePassword(datas);
        setError(undefined);
        return true;
      }
      catch(err){
          setError(err);
          return false;
      }
    }
    return{
      getAccessToken:(credentials:Credentials)=>_getAccessToken(credentials),
      createUser:(userDatas:User)=>_createUser(userDatas),
      updatePassword:(datas:PasswordUpdate)=>_updatePassword(datas),
      error
    }
  }
  