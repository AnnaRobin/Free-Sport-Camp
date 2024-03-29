import { useState } from 'react';
import {Profile, ProfileParams, ProfileService} from '../../services/Profile';
import UserHelper from '../../helpers/UserHelper';

export default function useProfile(){
    const [profile, setProfile] = useState<Profile|null>(null);
    const [error, setError] = useState<Error|undefined>(undefined);
    const prefix = "33";
    const profileService = new ProfileService();

    async function _get(userId?: number): Promise<void>{
        try{
            const results = await profileService.get(userId);
            if(results.birthDate){
                results.age = Math.floor((Date.now() - Date.parse(results.birthDate.toString()))/31557600000);
            }
            setProfile(results);
            setError(undefined);
        }
        catch(err){
            setError(err);
            
        }  
    }
    async function _save(params:ProfileParams): Promise<Boolean>{
        try{
            if(params.phoneNumber){
                params.phoneNumber = prefix.concat(params.phoneNumber);
            }
            await profileService.save(params);
            setError(undefined);
            return true;
        }
        catch(err){
            setError(err);
            return false;
        }      
    }
    async function _remove(): Promise<Boolean>{
        try{
            await profileService.remove();
            UserHelper.disconnect();
            setError(undefined);
            return true;
        }
        catch(err){
            setError(err);
            return false;
        }
    }

    return {
        get: ()=>_get(),
        getPublic: (userId:number) => _get(userId),
        save: (params:ProfileParams) => _save(params),
        remove:()=>_remove(),
        profile,
        error,
        prefix
    }

    
}
