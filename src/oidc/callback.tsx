import * as React from 'react';
import {OIDCService} from "./oidc";

export const Callback:React.FC = () => {
    const client = new OIDCService()
    client.signinRedirectCallback().then(() => {
        window.location.assign("/");
    }).catch(function (e) {
        console.error(e);
    });
    return (
        <div>
            Logging In....
        </div>
    )
}