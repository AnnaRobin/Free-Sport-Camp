import { useState } from 'react';
import UserHelper from '../../helpers/UserHelper';
import {EditorParams, EventService} from '../../services/Event';
import { basicProfile } from '../../services/Profile';


// custom hooks for Events
export function useEvent(){
    const [event, setEvent] = useState<EditorParams | null>(null);
    const [error, setError] = useState<Error | undefined>(undefined);
    const [subscribers, setSubscribers] = useState<basicProfile[]>([]);

    const eventService = new EventService();
    
    // 
    async function _get(id:number): Promise<void>{
        try{
            const results = await eventService.get(id);
            setEvent(results);
            if(!results){
                setEvent(null);
            }
        }
        catch(err){
            setEvent(null);
            setError(err);
        }
    }

    async function _save(params:EditorParams): Promise<Boolean>{
        try{
            await eventService.save(params);
            setError(undefined);
            return true;
        }
        catch(err){
            setError(err);
            return false;
        }
    }
    async function _remove(eventId: number):Promise<Boolean> {
        try{
            await eventService.remove(eventId);
            setError(undefined);
            return true;
        }
        catch(err){
            setError(err);
            return false;
        }
    }
    async function _subscribe(eventId: number, subscribe: boolean): Promise<Boolean> {
        try {
          await eventService.subscribe(eventId, subscribe);
          setError(undefined);
          var name = UserHelper.getName();
          if(name === null){
            return false;
          }
          var users: Array<basicProfile> = subscribers;
          if(subscribe){
            users.push({ id: -1, userName: name });
            setSubscribers(users);
          }
          else{
            var index = -1;
            users.forEach(function (item: basicProfile, key: number) {
              if (item.userName === name) {
                index = key;
              }
            });
            if (index >= 0) {
              users.splice(index, 1);
              setSubscribers(users);
            }
          }
          return true;
        }
        catch (err) {
          setError(err);
          return false;
        }
      }
    
      async function _getSubscribers(eventId:number):Promise<void>{
        try {
          const results = await eventService.getSubscribers(eventId);
          setSubscribers(results);
        }
        catch (err) {
          setError(err);
        }
      }
    return {
        get:(id:number)=> _get(id),
        save:(params:EditorParams) => _save(params),
        remove:(id:number)=>_remove(id),
        subscribeEvent:(eventId: number, subscribe: boolean)=>_subscribe(eventId,subscribe),
        getEventSubscribers:(eventId: number)=>_getSubscribers(eventId),
        event,
        subscribers,
        error
    }
}