import { useState, useEffect } from 'react';
import {Option, EventService} from '../../services/event.service';


export default function useOptions() {
    const [sports, setSports] = useState<Option[]>([]);
    const [cities, setCities] = useState<Option[]>([]);
    const [times, setTimes] = useState<Option[]>([]);
    const [levels, setLevels] = useState<Option[]>([]);
    const [genders, setGenders] = useState<Option[]>([]);
    const eventService = new EventService();
    
    async function _getOptions(){
        try{
            const results = await eventService.getOptions();
            setSports(results.sports);
            setCities(results.cities);
            setTimes(results.times);
            setLevels(results.levels);
            setGenders([{id:"MALE",name:"Homme"},{id:"FEMALE",name:"Femme"}]);
        }
        catch(err){
            console.log(err.message);
        }
        
    }

    useEffect(() => {
        _getOptions();
    }, [])

    return {
        sportOptions: sports,
        cityOptions: cities,
        timeOptions: times,
        levelOptions: levels,
        genderOptions: genders
    }
}





