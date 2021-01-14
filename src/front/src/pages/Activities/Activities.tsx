import React, { FunctionComponent, useEffect, useState} from 'react';
import { Jumbotron } from 'reactstrap';
import { useForm, Controller } from "react-hook-form";
import Event from '../../components/Event';
import UserHelper from '../../components/UserHelper';
import AjaxHelper from '../../components/AjaxHelper';



// Custom Hook
function useSearch() {

  // *************  State Hooks *************//
  const [events, setEvents] = useState<Event[]>([]);
  const [error, setError] = useState<string | undefined>("Vous ne vous êtes abonné à aucun évènement!");
  // ****************************************//

  async function _search(): Promise<void> {
    try {
      AjaxHelper.fetch('http://localhost:8585/api/event/getSubscribed','GET',true,{})
      .then(function(response){
        if (response.status !== 200) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(function(results){
        setEvents(results);
        if (results.length == 0) {
          setError("Ooops, visiblement vous êtes la première personne avec ces besoins. Mais ce est pas grave, vous pouvez organiser un événement, si vous le souhaitez!");
        }
        else {
          setError(undefined);
        }
      });
    } catch (err) {
      setEvents([]);
      setError(err.message)
    }
  }
  // search : returns a function _search defined in hook
  // events : contains a list of events
  // error : contains errors (eventually populated in _search function)
  return {
    search: () => _search(),
    events,
    error,
  }
}
/////////////////////////////

const Activities: FunctionComponent<{}> = () => {
  
  // hook Search
  const { search, events, error } = useSearch();

 

  useEffect(() => {
    search();
  }, [])
  return (
    <>
      <Jumbotron fluid className="alert-light results container" id="resultContainer">
        {/* events contains list of events found by useSearch Custom Hook*/}
        {/* [TRUE|FALSE]? (then) : (else) */}
        {events.length ? events.map((event) => {
          return (<Event event={event} />)
        }) :
          <h2 id="defaultMessage">{error}</h2>
        }
      </Jumbotron>
    
  </>
  );
      
}

export default Activities;