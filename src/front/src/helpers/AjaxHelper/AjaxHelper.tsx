// Helpers are transversal classes, facilitating the use of recurrent functions

/*AjaxHelper encapsulates the fetch function and facilitates the management of authenticated API requests:
A Boolean passed as a parameter allows to automatically add the access token to the fetch headers.
If a request returns a 401 code, the user is automatically redirected to the login page.*/

import UserHelper from '../UserHelper';

interface Dictionary<T> {
    [Key: string]: T;
}
class AjaxHelper {

    static fetch(url: string, method: string, auth: boolean, headers?: Dictionary<string>, body?: string): Promise<Response> {
        let options: Dictionary<any> = {};
        // initialize an empty dictionary
        if (headers === undefined) {
            headers = {};
        }
        if (auth) {
            headers['Authorization'] = 'Bearer ' + UserHelper.getToken() // if auth = true => add into headers..
        }
        options['method'] = method;
        options['headers'] = headers;
        if (method !== 'GET' && body !== undefined) {
            options['body'] = body;
        }
        return fetch(url,
            options
        )
            .then(function (response) {
                if (auth && response.status === 401) {
                    UserHelper.disconnect();
                    window.location.replace('/connection');
                }
                return response;
            });
    }
}
export default AjaxHelper;