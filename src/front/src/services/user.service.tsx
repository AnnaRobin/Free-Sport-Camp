import AjaxHelper from '../helpers/AjaxHelper';

export interface User extends Credentials {
    name: string,
    email: string,
    confirmation: string
}

export interface Credentials {
    client_id: any,
    grant_type: any,
    userName: string,
    password: string
};

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

        if (response.status === 400) {
            throw new Error("erreur d'authentification");
        }
        if (response.status !== 200) {
            throw new Error(response.statusText);
        }
        return response.json();

    }

    public async create(userDatas:User):Promise<any>{
        const response = await  fetch('http://localhost:8585/api/user', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(userDatas)
          });
        if (response.status !== 200) {
            throw new Error(response.statusText);
        }
        return response.json();
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