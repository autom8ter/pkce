import * as React from 'react';
import {ApiClientService} from "../oidc/oidc";

export const Callback:React.FC = () => {
    const client = new ApiClientService()
    client.oidcService.signinRedirectCallback().then(function () {
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