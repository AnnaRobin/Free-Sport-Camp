import React, { FunctionComponent, useEffect } from 'react';
import { Jumbotron } from 'reactstrap';
import Paging from '../../components/Paging';
import EventView from '../../components/Event';
import useSearch from '../../components/Search';


const Activities: FunctionComponent<{}> = () => {
  
    // hook Search
    const { getSubscribed, events, total, currentPage, error } = useSearch();
    const pageSize = 5;
  
    useEffect(() => {
      getSubscribed(0, pageSize);
    }, [])
    return (
      <>
        <Jumbotron fluid className="alert-light results container" id="resultContainer">
          {/* events contains list of events found by useSearch Custom Hook*/}
          {/* [TRUE|FALSE]? (then) : (else) */}
          {events.length ? events.map((event) => {
            return (<EventView key={event.id} event={event} />)
          }) :
            <h2 id="defaultMessage">{error}</h2>
          }
          <Paging totalCount={total} pageSize={pageSize} currentPage={currentPage} handleClick={(pageNumber:number)=>{getSubscribed(pageNumber, pageSize);}} scrollTo="#resultContainer" />
        </Jumbotron>
      
    </>
    );
        
  }
  
  export default Activities;