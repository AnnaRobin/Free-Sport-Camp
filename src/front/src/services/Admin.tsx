import AjaxHelper from '../helpers/AjaxHelper';


import { basicProfile, PageParams, Page } from './CommonTypes'

export interface ProfileToAdmin extends basicProfile {
    fullName: string,
    phoneNumber?: string,
    email: string
}

export class AdminService {
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
    // endpoint to delete resources (profiles) with given id - admin
    public async removeAnybody(id: number): Promise<void> {
        const response = await AjaxHelper.fetch(`http://localhost:8585/api/admin/?id=${id}`, 'DELETE', true, {
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
}