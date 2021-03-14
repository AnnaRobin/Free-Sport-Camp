import { useState, useEffect } from 'react';
import {Option, EventService} from '../../services/event.service';

interface OptionAdapter {
    value:number,
    label:string
}

export default function useOptions() {
    const [sports, setSports] = useState<Option[]>([]);
    const [cities, setCities] = useState<Option[]>([]);
    const [times, setTimes] = useState<Option[]>([]);
    const [levels, setLevels] = useState<Option[]>([]);
    const eventService = new EventService();
    
    async function _getOptions(){
        const results = await eventService.getOptions();
        setSports(results.sports);
        setCities(results.cities);
        setTimes(results.times);
        setLevels(results.levels);
    }

    useEffect(() => {
        _getOptions();
    }, [])

    return {
        sportOptions: sports,
        cityOptions: cities,
        timeOptions: times,
        levelOptions: levels
    }
}





