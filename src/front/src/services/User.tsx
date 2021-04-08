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

    public async getAccessToken(data: Credentials): Promise<any> {
        const response = await AjaxHelper.fetch('http://localhost:8585/oauth/token',
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
                //const datas = await response.json();
                throw new Error("Nom d'utilisateur ou mot de passe invalide");
            default:
                throw new Error("Erreur inconnue");
        }
    }

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
        //return ErrorHelper.readResponse(response);
    }

    public async updatePassword(datas:PasswordUpdate):Promise<any>{
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
            throw new Error(response.statusText);
        }
        return response.json();
    }
}