import AjaxHelper from '../helpers/AjaxHelper';
import {basicProfile} from './profile.service';

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
    organizerUserName: string;
    organizerPhoneNumber: string;
    isSubscribed: boolean;
    isOwner: boolean;
}

export interface SearchParams extends PageParams {
    cityId: number,
    sportId: number,
    levelId: number,
    timeId: number
}

export interface PageParams {
    page: number,
    size: number
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

    public async subscribe(eventId:number, subscribe:boolean): Promise<any>{
        try{
            const url = subscribe ? `http://localhost:8585/api/event/subscribe?eventId=${eventId}` : `http://localhost:8585/api/event/unsubscribe?eventId=${eventId}`;
            const method = subscribe ? 'POST' : 'DELETE';
    
            const response = await AjaxHelper.fetch(url, method, true);
            if (response.status !== 200) {
                return Promise.reject();
            }
    
            return response.json();
        }
        catch(err){
            throw new Error(err.message);
        }
        

    }
}
