import * as React from 'react';
import {OIDCService} from "./oidc";

export const SilentCallback:React.FC = () => {
    const client = new OIDCService()
    client.signinSilentCallback().catch(e => {
        console.error(e);
    });
    return (
        <div>
            Logging In....
        </div>
    )
}