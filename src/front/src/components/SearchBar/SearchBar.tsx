import React, { FunctionComponent, useState, useEffect } from 'react';
import { Jumbotron, Button } from 'reactstrap';
import { useForm } from "react-hook-form";
import Select from '../../components/Select';
import Result from '../../components/Result';

interface Option {
  id: number;
  name: string;
}

export function useOptions() {
  const [sports, setSports] = useState<Option[]>([]);
  const [cities, setCities] = useState<Option[]>([]);
  const [times, setTimes] = useState<Option[]>([]);
  const [levels, setLevels] = useState<Option[]>([]);



  useEffect(() => {
    fetch('http://localhost:8585/event/options', {
      method: 'GET',
    })
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
interface Event {
  id: number;
  appointment: any;
  description: string;
  cityName: string;
  timeName: string;
  levelName: string;
  sportName: string;
  organizerUserName: string;
  organizerPhoneNumber: string;
}

export function useSearch() {
  const [events, setEvents] = useState<Event[]>([]);
  const [error, setError] = useState<string | undefined>("Votre allié pour trouver des partenaires de sport");

  async function _search(cityId: number, sportId: number, levelId: number, timeId: number): Promise<void> {
    try {
      const response = await fetch(`http://localhost:8585/event/search/${cityId}/${sportId}/${levelId}/${timeId}`, {
        method: 'GET',
      });
      if (response.status !== 200) throw new Error(response.statusText);
      const results = await response.json();

      setEvents(results);
      if (results.length == 0) {
        setError("Ooops, visiblement vous êtes la première personne avec ces besoins. Mais ce est pas grave, vous pouvez organiser un événement, si vous le souhaitez!");
      }
      else {
        setError(undefined);
      }

    } catch (err) {
      setEvents([]);
      setError(err.message)
    }
  }

  return {
    search: (cityId: number, sportId: number, levelId: number, timeId: number) => _search(cityId, sportId, levelId, timeId),
    events,
    error,
  }
}

interface SearchParams {
  city: number;
  time: number;
  level: number;
  sport: number;
}


const SearchBar: FunctionComponent<{}> = () => {

  const { search, events, error } = useSearch();
  const { sportOptions, cityOptions, timeOptions, levelOptions } = useOptions();



  //react hook form
  const { register, setValue, handleSubmit, errors } = useForm<SearchParams>();
  const onSubmit = handleSubmit(({ city, time, level, sport }) => {
    search(city, sport, level, time)
  });

  function handleChange(e: React.FormEvent<HTMLSelectElement>) {
    console.log(e.currentTarget.value);
  }

  return (
    <>
      <div>
        <Jumbotron className="mt-5">
          <form className="container -xl" onSubmit={onSubmit}>
            <div className="row">

              <div className="col-sm text-center" >
                <Select name="sport" label="Sport" options={sportOptions} register={register} />

              </div>
              <div className="col-sm text-center">
                <Select name="city" label="Ville" options={cityOptions} register={register} />

              </div>
              <div className="col-sm text-center">
                <Select name="level" label="Niveau" options={levelOptions} register={register} />

              </div>
              <div className="col-sm text-center">
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
          {events.length?events.map((event) => {
            return (<Result event={event} />)

          }):
        
         <h2 id="defaultMessage">{error}</h2>
        }
        </Jumbotron>
      </div>
    </>
  );
};



export default SearchBar;




