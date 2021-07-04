import { useState, useEffect } from 'react';
import {Option, EventService} from '../../services/Event';


export default function useOptions() {
    // definition of states
    const [sports, setSports] = useState<Option[]>([]);
    const [cities, setCities] = useState<Option[]>([]);
    const [times, setTimes] = useState<Option[]>([]);
    const [levels, setLevels] = useState<Option[]>([]);
    const [genders, setGenders] = useState<Option[]>([]);
    const [error, setError] = useState<Error | undefined>(undefined);
    // instancie le service
    const eventService = new EventService();
    
    async function _getOptions():Promise<void>{
        try{
            const results = await eventService.getOptions();
            setSports(results.sports);
            setCities(results.cities);
            setTimes(results.times);
            setLevels(results.levels);
            setGenders([{id:"MALE",name:"Homme"},{id:"FEMALE",name:"Femme"}]);
            setError(undefined);
        }
        catch(err){
            setError(err);
        }   
    }
    // execute at the execution of useOptions
    useEffect(() => {
        _getOptions();
    }, [])

    return {
        sportOptions: sports,
        cityOptions: cities,
        timeOptions: times,
        levelOptions: levels,
        genderOptions: genders,
        error
    }
}





