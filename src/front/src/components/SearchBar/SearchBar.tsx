import React, { FunctionComponent} from 'react';
import { Jumbotron, Button } from 'reactstrap';
import { useForm } from "react-hook-form";
import Select from '../../components/Select';
import EventView from '../../components/Event';
import useOptions from '../../components/Options';
import useSearch from '../../components/Search';
import Paging from '../Paging';



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
  const { search, events, total, currentPage, error } = useSearch();

  // hook option
  const { sportOptions, cityOptions, timeOptions, levelOptions } = useOptions();

  // React Hook Form
  const { register, watch, handleSubmit, errors } = useForm<SearchParams>();


  const pageSize = 5;
  //****************************************************************************//


  //**************************** Event Handlers ********************************//


  //handle form submission
  const onSubmit = handleSubmit(({ city, time, level, sport }) => {
    console.log(city);
    search(city, sport, level, time, 0, pageSize);
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
            return (<EventView key={event.id} event={event} />)
          })  :
            <h2 id="defaultMessage">{error}</h2>
          }
          
            
              <Paging totalCount={total} pageSize={pageSize} currentPage={currentPage} handleClick={(pageNumber:number)=>{search(watch("city"), watch("sport"), watch("level"), watch("time"), pageNumber, pageSize);}} scrollTo="#resultContainer" />
            
          
          
        </Jumbotron>
      </div>
    </>
  );
  //****************************************************************************//
};

export default SearchBar;




