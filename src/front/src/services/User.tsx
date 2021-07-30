/*The services folder contains service classes and interfaces.
 The methods of the service classes encapsulate the endpoints of the back end API.
 The interfaces allow to type the data returned by the above mentioned methods.*/
import AjaxHelper from '../helpers/AjaxHelper';

export interface Credentials {
    client_id: any,
    grant_type: any,
    userName: string,
    password: string
};
export interface User extends Credentials {
    fullName: string,
    email: string,
    confirmation: string
}
export interface PasswordUpdate {
    previousPassword: string,
    password: string,
    confirmation: string
};

export class UserService {
    // endpoint to get the Access Token
    public async getAccessToken(data: Credentials): Promise<any> {
        const response = await AjaxHelper.fetch('http://localhost:8585/oauth/token', // endpoint provided by Spring Boot
            'POST',
            false,
            {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            "username=" + data.userName
            + "&password=" + data.password
            + "&client_id=" + data.client_id
            + "&grant_type=" + data.grant_type);
        
        switch(response.status){
            case 200:
                return response.json();
            case 400:
                throw new Error("Nom d'utilisateur ou mot de passe invalide");
            default:
                throw new Error("Erreur inconnue");
        }
    }
    // Endpoint to create a resource (user) with given inputs.
    public async create(userDatas:User):Promise<any>{
        const response = await  AjaxHelper.fetch('http://localhost:8585/api/user',
            'POST',
            false,
            {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            JSON.stringify(userDatas)
        );

        if(response.status !== 400){
            return response.json();
        }
        const datas = await response.json();
          
        if(Array.isArray(datas)){
            switch(datas[0].code){
                case "UniqueMail":
                    throw new Error("Ce mail est déjà utilisé");
                case "UniqueName":
                    throw new Error("Nom d'utilisateur est déjà pris");
                default:
                    throw new Error("Erreur inconnue");
            }
        }
        return response.json();
    }
    // Endpoint to update a resource (password) with given inputs.
    public async updatePassword(datas:PasswordUpdate):Promise<any>{
        try{
            const response = await  AjaxHelper.fetch('http://localhost:8585/api/user/password',
            'POST',
            true,
            {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            JSON.stringify(datas)
        );
        if (response.status !== 200) {
            throw new Error("Erreur lors de la modification du mot de passe");
        }
        return response.text();
        }
        catch(err){
            throw new Error(err.message);
        }
        
    }
}