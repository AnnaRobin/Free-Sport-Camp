import UserHelper from '../UserHelper';

interface Dictionary<T> {
    [Key: string]: T;
}
class AjaxHelper{

    static fetch(url:string,method:string,auth:boolean,headers?:Dictionary<string>,body?:string):Promise<Response>{
        let options:Dictionary<any> = {};
        if(headers === undefined){
            headers = {};
        }
        // if(body === undefined){
        //     body = '';
        // }
        if(auth){
            headers['Authorization'] = 'Bearer ' + UserHelper.getToken()
        }
        options['method'] = method;
        options['headers'] = headers;
        if(method != 'GET' && body != undefined){
            options['body'] = body;
        }
        return fetch(url,
                    options
                    )
                    .then(function (response){
                        if(auth && response.status === 401){
                            UserHelper.disconnect();
                            window.location.replace('/connection');
                        }
                        return response;
                    });
    }
}
export default AjaxHelper;