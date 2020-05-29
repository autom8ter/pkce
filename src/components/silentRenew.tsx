import * as React from 'react';
import {ApiClientService} from "../oidc/oidc";

export const SilentCallback:React.FC = () => {
    const client = new ApiClientService()
    client.oidcService.signinSilentCallback().catch(function (error) {
        console.error(error);
    });
    return (
        <div>
            Logging In....
        </div>
    )
}