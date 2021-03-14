import React, { FunctionComponent, useEffect, useState} from 'react';
import { Jumbotron } from 'reactstrap';
import EventView from '../../components/Event';
import useSearch from '../../components/Search';
import Paging from '../../components/Paging';


const Publications: FunctionComponent<{}> = () => {
  
    // hook Search
    const { getCreated, events, total, currentPage, error } = useSearch();
    const pageSize = 10;
  
    useEffect(() => {
      getCreated(0, pageSize);
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
          <Paging totalCount={total} pageSize={pageSize} currentPage={currentPage} handleClick={(pageNumber:number)=>{getCreated(pageNumber, pageSize);}} scrollTo="#resultContainer" />
        </Jumbotron>
      
    </>
    );
        
  }
  
  export default Publications;