import React, { FunctionComponent, useState, useEffect } from 'react';
import { Jumbotron, Button } from 'reactstrap';
import { useForm } from "react-hook-form";
import Select from '../../components/Select';
import Event from '../../components/Event';
import useOptions from '../../components/Options';
import UserHelper from '../UserHelper';
import AjaxHelper from '../AjaxHelper';

// Custom Hook
function useSearch() {

  // *************  State Hooks *************//
  const [events, setEvents] = useState<Event[]>([]);
  const [error, setError] = useState<string | undefined>("Votre allié pour trouver vos partenaires de sport !");
  // ****************************************//

  async function _search(cityId: number, sportId: number, levelId: number, timeId: number): Promise<void> {
    try {
      AjaxHelper.fetch(`http://localhost:8585/api/event/search?cityId=${cityId}&sportId=${sportId}&levelId=${levelId}&timeId=${timeId}`,'GET',true,{})
      .then(function(response){
        if (response.status !== 200) {
          throw new Error(response.statusText);
        }
        return response.json()
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
    search: (cityId: number, sportId: number, levelId: number, timeId: number) => _search(cityId, sportId, levelId, timeId),
    events,
    error,
  }
}
/////////////////////////////




type SearchParams = {
  city: number;
  time: number;
  level: number;
  sport: number;
}

//React Component
const SearchBar: FunctionComponent<{}> = () => {

  //****************************   Custom Hooks ********************************//

  // hook Search
  const { search, events, error } = useSearch();

  // hook option
  const { sportOptions, cityOptions, timeOptions, levelOptions } = useOptions();

  // React Hook Form
  const { register, setValue, handleSubmit, errors } = useForm<SearchParams>();

  //****************************************************************************//


  //**************************** Event Handlers ********************************//


  //handle form submission
  const onSubmit = handleSubmit(({ city, time, level, sport }) => {
    search(city, sport, level, time)
  });
 
  //****************************************************************************//


  //****************** React Component returned code ***************************//

  return (
    <>
      <div>
        <Jumbotron className="mt-5">
          <form className="container -xl" onSubmit={onSubmit}>{/* subscribe function handleSubmit() referenced by const onSubmit (Event Handlers) to submit event*/}
            <div className="row">

              <div className="col-sm text-center" >
                {/* sportOptions reference options list defined by UseOptions Hook */}
                {/* register reference register function defined by UseForm Hook */}
                <Select name="sport" label="Sport" options={sportOptions} register={register} />
              </div>

              <div className="col-sm text-center">
                {/* cityOptions reference options list defined by UseOptions Hook */}
                {/* register reference register function defined by UseForm Hook */}
                <Select name="city" label="Ville" options={cityOptions} register={register} />
              </div>

              <div className="col-sm text-center">
                {/* levelOptions reference options list defined by UseOptions Hook */}
                {/* register reference register function defined by UseForm Hook */}
                <Select name="level" label="Niveau" options={levelOptions} register={register} />
              </div>

              <div className="col-sm text-center">
                {/* timeOptions reference options list defined by UseOptions Hook */}
                {/* register reference register function defined by UseForm Hook */}
                <Select name="time" label="Créneau" options={timeOptions} register={register} />
              </div>

              <div className="col-sm text-center ">
                <Button type="submit" color="secondary">Recherche</Button>{' '}
              </div>
            </div>
          </form>
        </Jumbotron>
      </div>

      <div>

        <Jumbotron fluid className="alert-light results container" id="resultContainer">
          {/* events contains list of events found by useSearch Custom Hook*/}
          {/* [TRUE|FALSE]? (then) : (else) */}
          {events.length ? events.map((event) => {
            return (<Event event={event} />)
          }) :
            <h2 id="defaultMessage">{error}</h2>
          }
        </Jumbotron>
      </div>
    </>
  );
  //****************************************************************************//
};

export default SearchBar;




