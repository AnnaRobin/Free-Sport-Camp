/*
The services folder contains service classes and interfaces.
 The methods of the service classes encapsulate the endpoints of the back end API.
 The interfaces allow to type the data returned by the above mentioned methods.
 */


import AjaxHelper from '../helpers/AjaxHelper';
import {basicProfile} from './Profile';

export interface Option {
    id: number|string;
    name: string;
}

export interface Options {
    sports: Option[],
    levels: Option[],
    cities: Option[],
    times: Option[]
}


export interface Event {
    id: number;
    appointment: any;
    description: string;
    cityName: string;
    time: string;
    levelName: string;
    sportName: string;
    organizerId: number;
    organizerUserName: string;
    organizerPhoneNumber: string;
    isSubscribed: boolean;
    isOwner: boolean;
}
export interface PageParams {
    page: number,
    size: number
}
export interface SearchParams extends PageParams {
    cityId: number,
    sportId: number,
    levelId: number,
    timeId: number
}

export interface Page<T> {
    content: T,
    totalElements: number,
    pageable: any,
    empty: Boolean
}

export interface EditorParams {
    id?: number,
    cityId: any,
    levelId: any,
    sportId: any,
    appointment: any,
    time: any,
    description: string
}

export class EventService {
    //  This part of the code is responsible for the recovery of events according to the 4 criteria
    public async search(params: SearchParams): Promise<Page<Event[]>> {
        try{
            const response = await AjaxHelper.fetch(`http://localhost:8585/api/event/search?cityId=${params.cityId}&sportId=${params.sportId}&levelId=${params.levelId}&timeId=${params.timeId}&page=${params.page}&size=${params.size}`, 'GET', true, {})

            if (response.status !== 200) {
                throw new Error(response.statusText);
            }
            return response.json();
        }
        catch(err){
            throw new Error(err.message);
        }
    }
   // This part of the code is responsible for the recovery all of events where the connected user is subscribed with paging
    public async getSubscribed(params: PageParams): Promise<Page<Event[]>> {
        try{
            const response = await AjaxHelper.fetch(`http://localhost:8585/api/event/getSubscribed?page=${params.page}&size=${params.size}`, 'GET', true, {})

            if (response.status !== 200) {
                throw new Error(response.statusText);
            }
            return response.json();
        }
        catch(err){
            throw new Error(err.message);
        }
    }
    // Endpoint to searches and retrieves all the events, created by a user with paging
    public async getCreated(params: PageParams): Promise<Page<Event[]>> {
        try{
            const response = await AjaxHelper.fetch(`http://localhost:8585/api/event/getCreated?page=${params.page}&size=${params.size}`, 'GET', true, {})

            if (response.status !== 200) {
                throw new Error(response.statusText);
            }
            return response.json();
        }
        catch(err){
            throw new Error(err.message);
        }
    }
    
   // This part of the code is responsible for retrieving the 4(?) criterias from the back
    public async getOptions(): Promise<Options> {
        try{
            const response = await AjaxHelper.fetch('http://localhost:8585/api/event/options', 'GET', true, {});
            if (response.status !== 200) {
                throw new Error(response.statusText);
            }
            return response.json();
        }
        catch(err){
            throw new Error(err.message);
        }    
    }
    //  Endpoint to retrieve an event for edition, accessible for the creator of the event
    public async get(eventId: number): Promise<EditorParams> {
        try{
            const response = await AjaxHelper.fetch(`http://localhost:8585/api/event/getForEdition?id=${eventId}`, 'GET', true, {});
            if(response.status === 403) {
                throw new Error("Vous n'êtes pas autorisé à éditer cet évènement");
            }
            if (response.status !== 200) {
                throw new Error(response.statusText);
            }
            return response.json();
        }
        catch(err){
            throw new Error(err.message);
        }
    }
  //  Endpoint to update a resource (event) with given inputs
  // Only the organizer can update this resource
  // If the event already exists (same organizer at the same time) the recreation is not possible.
    public async save(params: EditorParams): Promise<number> {
        try{
            var method = 'POST';

            if (params.id) {
                method = 'PUT';
            }
            
            const response = await AjaxHelper.fetch('http://localhost:8585/api/event/', method, true, {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }, JSON.stringify(params));
            
            switch(response.status){
                case 500:
                    throw new Error("Erreur inconnue");
                case 403:
                    throw new Error("Vous n'êtes pas autorisé à éditer cet évènement");
                case 409:
                    throw new Error("Vous avez déjà un évènement sur ce créneau");
                default:
                    if([200,201].indexOf(response.status) === -1) {
                        throw new Error(response.statusText);
                    }        
            }
            return response.json();
        }
        catch(err){
            throw new Error(err.message);
        }
    }

    // Endpoint to delete the resource (event) with given id, if exist.
    public async remove(eventId: number):Promise<void>{
        try{
            const response = await AjaxHelper.fetch(`http://localhost:8585/api/event/?id=${eventId}`, 'DELETE', true);
            switch(response.status){
                case 200:
                    return;
                case 403:
                    throw new Error("Vous n'êtes pas autorisé à supprimer cet évènement");
                case 404:
                    throw new Error("Evènement non trouvé");
                default:
                    throw new Error(response.statusText);
            }
        }
        catch(err){
            throw new Error(err.message);
        }
    }
    //  Endpoint to searches and retrieve all the subscribers of an event
    public async getSubscribers(eventId: number): Promise<basicProfile[]> {
        try{
            const response = await AjaxHelper.fetch(`http://localhost:8585/api/event/getSubscribers?eventId=${eventId}`,
            'GET',
            true
        );

        if (response.status !== 200) {
            return Promise.reject();
        }

        return response.json();
        }
        catch(err){
            throw new Error(err.message);
        }
    }

    // Endpoint to create or delete a resource (subscription) with given id.
    public async subscribe(eventId:number, subscribe:boolean): Promise<void>{
        try{
            const url = subscribe ? `http://localhost:8585/api/event/subscribe?eventId=${eventId}` : `http://localhost:8585/api/event/unsubscribe?eventId=${eventId}`;
            const method = subscribe ? 'POST' : 'DELETE';
    
            const response = await AjaxHelper.fetch(url, method, true);
            if (response.status !== 200) {
                return Promise.reject();
            }
        }
        catch(err){
            throw new Error(err.message);
        }
    }
}
