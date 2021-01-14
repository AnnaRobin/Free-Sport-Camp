import React, { FunctionComponent } from 'react';
import UserHelper from '../UserHelper';

type LogoutProps = {
    className: string,
    text: string
}

const Logout: FunctionComponent<LogoutProps> = ({ className, text }) => {

    const logout = () => {
        if (UserHelper.isConnected()) {
            UserHelper.disconnect();
            window.location.href = "/";
        }
    }
    return (
        <span className={className} onClick={logout}> {text} </span>
    );
}
export default Logout;