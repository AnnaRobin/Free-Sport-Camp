import { useState } from 'react';
import {Event, SearchParams, EventService} from '../../services/Event';
import { PageParams } from '../../services/CommonTypes';

// Custom Hook
export default function useSearch() {

    // State Hooks 
    const [events, setEvents] = useState<Event[]>([]);
    const [error, setError] = useState<string | undefined>("Votre allié pour trouver vos partenaires de sport !");
    const [total, setTotal] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(0);
    
    const eventService = new EventService();
    
    async function _search(params:SearchParams): Promise<void> {
      try{
        const results = await eventService.search(params);
      
        setEvents(results.content);
        setTotal(results.totalElements);
        setCurrentPage(results.pageable.pageNumber);
        if(results.empty){
          setError("Ooops, visiblement vous êtes la première personne avec ces besoins. Mais ce est pas grave, vous pouvez organiser un événement, si vous le souhaitez!");
        }
        else{
          setError(undefined);
        }
      }
      catch(err){
        setEvents([]);
        setError(err.message);
      }
    }

    async function _getCreated(params:PageParams): Promise<void> {
      try{
        const results = await eventService.getCreated(params);
      
        setEvents(results.content);
        setTotal(results.totalElements);
        setCurrentPage(results.pageable.pageNumber);
        if(results.empty){
          setError("Vous n'avez pas encore organisé d'évènement!");
        }
        else{
          setError(undefined);
        }
      }
      catch(err){
        setEvents([]);
        setError(err.message);
      }
    }

    async function _getSubscribed(params:PageParams): Promise<void> {
      try{
        const results = await eventService.getSubscribed(params);
      
        setEvents(results.content);
        setTotal(results.totalElements);
        setCurrentPage(results.pageable.pageNumber);
        if(results.empty){
          setError("Vous n'êtes inscrit à aucun évènement!");
        }
        else{
          setError(undefined);
        }
      }
      catch(err){
        setEvents([]);
        setError(err.message);
      }
    }

    // search : returns a function _search defined in hook
    // events : contains a list of events
    // error : contains errors (eventually populated in _search function)
    return {
      search: (cityId: number, sportId: number, levelId: number, timeId: number, page:number, size:number) => _search({cityId, sportId, levelId, timeId, page, size}),
      getCreated: (page:number, size:number) => _getCreated({page, size}),
      getSubscribed: (page:number, size:number) => _getSubscribed({page, size}),
      events,
      total,
      currentPage,
      error
    }
  }
  