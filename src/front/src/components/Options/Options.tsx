import { useState, useEffect } from 'react';
import AjaxHelper from '../AjaxHelper';
interface Option {
    id: number;
    name: string;
}

export default function useOptions() {
    const [sports, setSports] = useState<Option[]>([]);
    const [cities, setCities] = useState<Option[]>([]);
    const [times, setTimes] = useState<Option[]>([]);
    const [levels, setLevels] = useState<Option[]>([]);



    useEffect(() => {
        AjaxHelper.fetch('http://localhost:8585/api/event/options','GET',true,{})
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            setSports(data['sports']);
            setCities(data['cities']);
            setTimes(data['times']);
            setLevels(data['levels']);
        })
    }, [])

    return {
        sportOptions: sports,
        cityOptions: cities,
        timeOptions: times,
        levelOptions: levels
    }
}





