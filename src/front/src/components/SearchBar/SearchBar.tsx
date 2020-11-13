import React,  { FunctionComponent, useState,useEffect}  from 'react';
import { Jumbotron, Button } from 'reactstrap';

interface Option{
  id: number;
  name: string;
}

export function useOptions(){
  const [sports,setSports] = useState<Option[]>([]);
  const [cities, setCities] = useState<Option[]>([]);
  const [times,setTimes] = useState<Option[]>([]);
  const [levels, setLevels] = useState<Option[]>([]);

  useEffect(()=> {
    fetch('http://localhost:8585/event/options', {
      method: 'GET',
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      setSports(data['sports']);
      setCities(data['cities']);
      setTimes(data['times']);
      setLevels(data['levels']);
    })
    },[])

    return {
      sportOptions: sports,
      cityOptions: cities,
      timeOptions: times,
      levelOptions: levels
    }
}


const SearchBar: FunctionComponent<{}> = () => {

  const {sportOptions, cityOptions, timeOptions, levelOptions} = useOptions();
  
    
  return (
        <Jumbotron className="mt-5">  
      <form className="container">  
      <div className="row">
          
      <div className="col-sm text-center" >
      <select className="form-control" id="sport">
      <option value="" disabled selected>Sport</option>
      {sportOptions.map((option)=>{
        return (
          <option value={option.id}>{option.name}</option>
        )
      })}
    
      
      </select>
      </div>
      <div className="col-sm text-center">
           <select className="form-control" id="city">
           <option value="" disabled selected>City</option>
      {cityOptions.map((option)=>{
        return (
          <option value={option.id}>{option.name}</option>
        )
      })}
        
       </select>
       </div>
       <div className="col-sm text-center">
       <select className="form-control" id="time">
       <option value="" disabled selected>Time</option>
       {timeOptions.map((option)=>{
        return (
          <option value={option.id}>{option.name}</option>
        )
      })}
          
       </select>
       </div>
       <div className="col-sm text-center">
       <select className="form-control" id="level">
       <option value="" disabled selected>Level</option>
       {levelOptions.map((option)=>{
        return (
          <option value={option.id}>{option.name}</option>
        )
      })}
          
       </select>
       </div>
       
       <div className="col-sm text-center">
       <Button color="secondary" >Rechercher</Button>{' '}
       </div>
       </div>
</form>
</Jumbotron>
     );
   };



 export default SearchBar;




