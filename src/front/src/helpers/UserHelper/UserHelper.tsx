//Helpers are transversal classes, facilitating the use of recurrent functions
// UserHelper manage the connection of a user by putting/removing the user name and the access token to the local storage
import jwtDecode from "jwt-decode";

class UserHelper {

    static isConnected(): Boolean {
        return UserHelper.getName() != null;
    }

    static getName(): string | null {
        return localStorage.getItem('user_name');
    }

    static connect(token: string): void {
        localStorage.setItem("access_token", token);
        const decoded = jwtDecode<any>(token);
        localStorage.setItem("user_name", decoded.user_name);
    }

    static disconnect(): void {
        localStorage.removeItem("user_name");
        localStorage.removeItem("access_token");
        console.log("test");
    }

    static getToken(): string | null {
        if (UserHelper.isConnected()) {
            return localStorage.getItem('access_token');
        }
        return null;
    }

}

export default UserHelper;