
import React, { FunctionComponent, useEffect } from 'react';
import { Alert } from 'reactstrap';
import { useParams } from 'react-router-dom';
import  Editor  from '../../components/Event/Editor';
import  {useEvent}  from '../../components/Event/Hook';

type EventParams = {
    eventId: string;
  };
const Edit: FunctionComponent<{}> = () => {
    const params = useParams<EventParams>();
    const {get,event,error} = useEvent();
    useEffect(()=>{
          get(Number(params.eventId));
  },[])
    return (
      <>
        {event && <Editor params={event}/>}
        {error && <Alert color="danger">{error.message}</Alert>}
        </>
    );
  }
export default Edit;

