/*The services folder contains service classes and interfaces.
 The methods of the service classes encapsulate the endpoints of the back end API.
 The interfaces allow to type the data returned by the above mentioned methods.*/
import AjaxHelper from '../helpers/AjaxHelper';
import { PageParams, Page } from './Event';


export interface basicProfile {
    id: number;
    userName: string;
}
export interface Profile extends basicProfile {
    presentation: string;
    phoneNumber?: string;
    cityId: number;
    cityName: string;
    sex?: string;
    birthDate?: Date;
    age?: number;
    isOwner: boolean;
}
export interface ProfileParams {
    presentation: string;
    phoneNumber: string;
    cityId: number;
    sex: number;
    birthDate: Date;
}

export interface ProfileToAdmin extends basicProfile {
    fullName: string,
    phoneNumber?: string,
    email: string
}



export class ProfileService {
    // endpoint to retrieve a view of a resource (personal and public profile)
    public async get(userId?: number): Promise<Profile> {
        var url = 'http://localhost:8585/api/profile';
        if (userId !== undefined) {
            url = url.concat('/public?userId=' + userId);
        }
        const response = await AjaxHelper.fetch(url, 'GET', true, {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        });
        switch (response.status) {
            case 400:
                throw new Error("Erreur lors de la récupération du profil");
            default:
                if ([200].indexOf(response.status) === -1) {
                    throw new Error(response.statusText);
                }
        }
        return response.json();
    }
    //  endpoint to update a resource (profile) with given inputs
    public async save(params: ProfileParams): Promise<void> {
        const response = await AjaxHelper.fetch('http://localhost:8585/api/profile/update', 'POST', true, {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        }, JSON.stringify(params));

        switch (response.status) {
            case 400:
                throw new Error("Erreur lors de la mise à jour du profile");
            default:
                if ([200, 201].indexOf(response.status) === -1) {
                    throw new Error(response.statusText);
                }
        }
    }
    // endpoint to delete the resource (profile) with given id
    public async remove(): Promise<void> {
        const response = await AjaxHelper.fetch('http://localhost:8585/api/profile', 'DELETE', true, {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        });
        switch (response.status) {
            case 400:
                throw new Error("Erreur lors de la mise à jour du profile");
            default:
                if ([200, 201].indexOf(response.status) === -1) {
                    throw new Error(response.statusText);
                }
        }
    }
    // endpoint to retrieve a view of a resource (profile for Admin)
    public async getAllUsers(params: PageParams): Promise<Page<ProfileToAdmin[]>> {
        try {
            const response = await AjaxHelper.fetch(`http://localhost:8585/api/admin/?page=${params.page}&size=${params.size}`, 'GET', true, {})
            if (response.status !== 200) {
                throw new Error(response.statusText);
            }
            return response.json();
        }
        catch (err) {
            throw new Error(err.message);
        }

    }

}


