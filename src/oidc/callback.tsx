import * as React from 'react';
import {OIDCService} from "./oidc";

const json = require('../config.json');

export const Callback:React.FC = () => {
    const client = new OIDCService({
        authority: json.authority,
        client_id: json.client_id,
        redirect_uri: json.redirect_uri,
        post_logout_redirect_uri: json.post_logout_redirect_uri,
        silent_redirect_uri: json.silent_redirect_uri,
        popup_redirect_uri: json.popup_redirect_uri,
        scope: json.scope,
    })
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