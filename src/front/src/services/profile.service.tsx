import AjaxHelper from '../helpers/AjaxHelper';

export interface Profile {
    id: number;
    userName: string;
    presentation:string;
    phoneNumber?:string;
    cityId:number;
    cityName:string;
    isOwner: boolean;
  }


export class ProfileService{

    public async get(userId?: number): Promise<Profile> {
        var url = 'http://localhost:8585/api/profile';
        if(userId != undefined){
            url = url.concat('/public?userId=' + userId);
        }
        const response = await AjaxHelper.fetch(url,'GET',true,{
            Accept: 'application/json',
            'Content-Type': 'application/json'
          });
        
        if(response.status != 200){
            return Promise.reject();
        }

        return response.json();
    }
}